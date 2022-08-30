import { Datum } from '@angel-oak/utils/date/datum';
import { IDateTime } from './schema';
import dtDate from './date';
import dtTime from './time';

export const DateTime = {
	init: {
		date: (date: IDateTime.Date): Datum => dtDate.init(date),
		time: (date: Datum, time: IDateTime.Time): Datum => dtTime.init(date, time),
		datetime: (date: IDateTime): Datum => {
			return dtTime.init(dtDate.init(date), date);
		},
	},
	serialize: {
		date: (date: Datum): IDateTime.Date => dtDate.serialize(date),
		time: (date: Datum): IDateTime.Time => dtTime.serialize(date),
		datetime: (dateTime: Datum): IDateTime => {
			const date = dtDate.serialize(dateTime);
			const time = dtTime.serialize(dateTime);
			return { ...date, ...time };
		},
	},
};
