import { DateService } from '@angel-oak/utils/date';
import { Datum } from '@angel-oak/utils/date/datum';
import { useCallback, useMemo } from 'react';
import { Slider } from './slider';

export interface IDateSliderModel {
	id: string;
	min: number;
	max: number;
	label: string;
	marks: (string | number)[];
	tooltip?: (value: number) => string | number;
	toPrimitive(value: Datum): number;
	toDatum(date: Datum, value: number): Datum;
}

export interface IDateSliderProps {
	value: Datum;
	onChange: (value: Datum) => void;
}

export const makeDateSlider = (model: IDateSliderModel) => {
	const { id, min, max, label, marks, tooltip, toPrimitive, toDatum } = model;
	const DateSlider: React.FC<IDateSliderProps> = (props) => {
		const value = useMemo(() => toPrimitive(props.value), [props.value]);

		const onChange = useCallback(
			(value: number) => {
				props.onChange(toDatum(props.value, value));
			},
			[props.value]
		);

		return (
			<Slider
				id={id}
				min={min}
				max={max}
				label={label}
				marks={marks}
				tooltip={tooltip}
				value={value}
				onChange={onChange}
			/>
		);
	};

	return DateSlider;
};

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const DAYS = new Array(25).fill(0).map((_, index) => index + 1);

export const DateSlider = {
	Weekly: makeDateSlider({
		id: 'weekly',
		min: 0,
		max: 6,
		label: 'Select Weekday',
		marks: WEEKDAYS.map((weekday) => weekday.substring(0, 3)),
		tooltip: (value) => WEEKDAYS[value],
		toPrimitive: (value: Datum) => value.getDay(),
		toDatum: (date: Datum, value: number): Datum => {
			return date.copy().setWeekday(value).toUTC();
		},
	}),
	Monthly: makeDateSlider({
		id: 'monthly',
		min: 0,
		max: 27,
		label: 'Select Day of Month',
		marks: [...DAYS.filter((_, index) => index % 3 === 0), 28],
		tooltip: (value) => value + 1,
		toPrimitive: (value: Datum) => value.getDate() - 1,
		toDatum: (date: Datum, day: number): Datum => {
			const next = date.copy();
			next.setDate(day + 1);
			return next;
		},
	}),
	Yearly: makeDateSlider({
		id: 'yearly',
		min: 0,
		max: 11,
		label: 'Select Month of Year',
		marks: MONTHS.map((month) => month.substring(0, 3)),
		tooltip: (value) => MONTHS[value],
		toPrimitive: (value: Datum) => value.getMonth(),
		toDatum: (date: Datum, month: number): Datum => {
			const next = date.copy().startOfMonth().addDays(2);
			next.setMonth(month);
			return next.startOfMonth();
		},
	}),
};
