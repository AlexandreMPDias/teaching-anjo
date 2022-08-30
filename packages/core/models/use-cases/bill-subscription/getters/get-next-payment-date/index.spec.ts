import faker from 'faker';
import { NextPaymentDateGetter, GetNextPaymentDateModel } from './index';
import { Datum } from '@angel-oak/utils/date/datum';
import { factory } from '@angel-oak/jester/factory';
import { BillSubscription } from '../..';
import { DateService } from '@angel-oak/utils/date';
import format from 'date-fns/format';
import { IBillSubscription } from '../../schema';

type DateServiceArg = ConstructorParameters<typeof NextPaymentDateGetter>[0];

const dataFactory = factory<GetNextPaymentDateModel, GetNextPaymentDateModel>(() => {
	const today = DateService.today();
	return {
		frequency: faker.random.arrayElement(BillSubscription.Frequency.OPTIONS),
		startDate: DateService.add.days(today, -20),
		prevPaymentDate: DateService.add.days(today, -2),
		endDate: null,
	};
});

const makeDateServiceStub = () => {
	class DateServiceStub implements DateServiceArg {
		public today = jest.fn(() => DateService.today());

		public reference: Datum | null = null;

		public add = {
			days: jest.fn(DateService.add.days),
			months: jest.fn(DateService.add.months),
			weeks: jest.fn(DateService.add.weeks),
			years: jest.fn(DateService.add.years),
		};

		public isRet = {
			after: jest.fn((date: Datum | number) => DateService.is(this.reference!).after(date)),
			before: jest.fn((date: Datum | number) => DateService.is(this.reference!).before(date)),
			same: {
				day: jest.fn((date: Datum) => DateService.is(this.reference!).same.day(date)),
				month: jest.fn((date: Datum) => DateService.is(this.reference!).same.month(date)),
				week: jest.fn((date: Datum) => DateService.is(this.reference!).same.week(date)),
				year: jest.fn((date: Datum) => DateService.is(this.reference!).same.year(date)),
			},
		};

		public is = jest.fn((datum: Datum) => {
			this.reference = datum;
			return this.isRet;
		});
	}
	return new DateServiceStub();
};

const makeSut = () => {
	const date = makeDateServiceStub();
	const sut = new NextPaymentDateGetter(date);
	return { sut, stubs: { date } };
};

const getMakeEqualTest =
	(frequency: IBillSubscription.Frequency) =>
	(data: Partial<GetNextPaymentDateModel>, reference: string, expectedDate: string | null) => {
		const { sut } = makeSut();
		const model = dataFactory.one({
			...data,
			frequency,
			prevPaymentDate: DateService.parse(reference),
		});
		const nextPaymentDate = sut.get(model);
		if (expectedDate === null) {
			expect(nextPaymentDate).toBeNull();
		} else {
			if (nextPaymentDate) {
				expect(format(nextPaymentDate!, 'yyyy-MM-dd')).toEqual(expectedDate);
			}
			expect(nextPaymentDate).not.toBeNull();
		}
	};

describe('get-next-payment-date test', () => {
	test('should use today as reference if prevPaymentDate is null', () => {
		const { sut, stubs } = makeSut();
		const today: any = 'today';

		const model = dataFactory.one({ frequency: 'yearly', prevPaymentDate: null });
		stubs.date.today.mockReturnValue(today);
		const getNextExpectedSpy = jest.spyOn(sut, 'getNextExpected');

		sut.get(model);
		expect(getNextExpectedSpy).toHaveBeenCalledWith(today, model.frequency);
	});

	test('should use prevPaymentDate as reference if it is not null', () => {
		const { sut, stubs } = makeSut();
		const reference: any = 'prevPaymentDate';

		const model = dataFactory.one({ frequency: 'yearly', prevPaymentDate: reference as any });
		stubs.date.today.mockReturnValue('today' as any);
		const getNextExpectedSpy = jest.spyOn(sut, 'getNextExpected');

		sut.get(model);
		expect(getNextExpectedSpy).toHaveBeenCalledWith(reference, model.frequency);
	});

	test('[end != null] should invoke is(...).before(...) with correct parameters', () => {
		const { sut, stubs } = makeSut();
		const expectedNextDate = 'expected-next-date' as any;
		const endDate = 'end-date' as any;

		jest.spyOn(sut, 'getNextExpected').mockReturnValue(expectedNextDate);
		sut.get(
			dataFactory.one({
				frequency: 'monthly',
				endDate: endDate,
			})
		);

		expect(stubs.date.is).toHaveBeenCalledWith(endDate);
		expect(stubs.date.isRet.before).toHaveBeenCalledWith(expectedNextDate);
	});

	describe('[frequency = monthly]', () => {
		const makeEqualTest = getMakeEqualTest('monthly');
		test('[end = null] should return same date, but next month', () => {
			const data = dataFactory.one({ endDate: null });
			const reference = '2020-01-01';
			const expected = '2020-02-01';
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by <1 month] should return null', () => {
			const reference = '2020-01-01';
			const expected = null;
			const data = dataFactory.one({ endDate: DateService.parse('2020-01-15') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by 1 month] should return same date, but next month', () => {
			const reference = '2020-01-01';
			const expected = '2020-02-01';
			const data = dataFactory.one({ endDate: DateService.parse('2020-02-01') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by >1 month] should return same date, but next month', () => {
			const reference = '2020-01-01';
			const expected = '2020-02-01';
			const data = dataFactory.one({ endDate: DateService.parse('2021-02-01') });
			makeEqualTest(data, reference, expected);
		});
	});

	describe('[frequency = weekly]', () => {
		const makeEqualTest = getMakeEqualTest('weekly');
		test('[end = null] should return same date, but next week', () => {
			const data = dataFactory.one({ endDate: null });
			const reference = '2020-01-01';
			const expected = '2020-01-08';
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by <1 week] should return null', () => {
			const reference = '2020-01-01';
			const expected = null;
			const data = dataFactory.one({ endDate: DateService.parse('2020-01-04') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by 1 week] should return same date, but next week', () => {
			const reference = '2020-01-01';
			const expected = '2020-01-08';
			const data = dataFactory.one({ endDate: DateService.parse('2020-01-08') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by >1 week] should return same date, but next week', () => {
			const reference = '2020-01-01';
			const expected = '2020-01-08';
			const data = dataFactory.one({ endDate: DateService.parse('2025-02-01') });
			makeEqualTest(data, reference, expected);
		});
	});

	describe('[frequency = yearly]', () => {
		const makeEqualTest = getMakeEqualTest('yearly');
		test('[end = null] should return same date, but next year', () => {
			const data = dataFactory.one({ endDate: null });
			const reference = '2020-01-01';
			const expected = '2021-01-01';
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by <1 year] should return null', () => {
			const reference = '2020-01-01';
			const expected = null;
			const data = dataFactory.one({ endDate: DateService.parse('2020-06-01') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by 1 year] should return same date, but next year', () => {
			const reference = '2020-01-01';
			const expected = '2021-01-01';
			const data = dataFactory.one({ endDate: DateService.parse('2021-01-01') });
			makeEqualTest(data, reference, expected);
		});

		test('[end > prevPaymentData by >1 year] should return same date, but next year', () => {
			const reference = '2020-01-01';
			const expected = '2021-01-01';
			const data = dataFactory.one({ endDate: DateService.parse('2025-02-01') });
			makeEqualTest(data, reference, expected);
		});
	});
});
