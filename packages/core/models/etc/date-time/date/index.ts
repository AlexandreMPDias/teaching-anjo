import { Datum } from '@angel-oak/utils/date/datum';
import { DbDate } from '../../db-date';
import { IDateTime_Date } from './schema';

export default {
	init: (date: IDateTime_Date.Api | Date | Datum): IDateTime_Date => {
		if (date instanceof Date) {
			return Datum.init(date);
		}
		return Datum.init(DbDate.init(date.source));
	},
	serialize: (date: IDateTime_Date): IDateTime_Date.Api => {
		return {
			year: date.year,
			month: date.month,
			day: date.day,
			weekday: date.weekday,
			source: DbDate.serialize(date) as any,
		};
	},
};
