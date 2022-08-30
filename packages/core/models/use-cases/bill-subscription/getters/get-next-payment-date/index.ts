import { DateService } from '@angel-oak/utils/date';
import { Datum } from '@angel-oak/utils/date/datum';
import { IBillSubscription } from '../../schema';

export type GetNextPaymentDateModel = {
	readonly frequency: IBillSubscription.Frequency;
	readonly startDate: Datum;
	readonly prevPaymentDate: Datum | null;
	readonly endDate: Datum | null;
};

export class NextPaymentDateGetter {
	constructor(private readonly date: Pick<DateService, 'add' | 'today' | 'is'>) {}

	public get = (model: GetNextPaymentDateModel): Datum | null => {
		const { frequency, endDate, prevPaymentDate, startDate } = model;
		const reference = prevPaymentDate ?? this.date.today();

		if (frequency === 'aperiodic') {
			return prevPaymentDate === null ? startDate : null;
		}

		const expectedNextDate = this.getNextExpected(reference, frequency);
		if (this.isExpectedNextDateAfterEndDate(expectedNextDate, endDate)) return null;
		return expectedNextDate;
	};

	public getNextExpected = (reference: Datum, frequency: IBillSubscription.Frequency): Datum => {
		switch (frequency) {
			case 'weekly':
				return this.date.add.weeks(reference, 1);
			case 'monthly':
				return this.date.add.months(reference, 1);
			case 'yearly':
				return this.date.add.years(reference, 1);
			default: {
				throw new Error('Invalid frequency: ' + frequency);
			}
		}
	};

	private isExpectedNextDateAfterEndDate = (
		expectedNextDate: Datum,
		endDate: Datum | null
	): boolean => {
		if (endDate === null) return false;
		return this.date.is(endDate).before(expectedNextDate);
	};
}

const nextPaymentGetter = new NextPaymentDateGetter(DateService);
export const nextPaymentDate = nextPaymentGetter.get.bind(nextPaymentGetter) as (
	model: GetNextPaymentDateModel
) => Datum | null;

export { nextPaymentDate as getNextPaymentDate };
