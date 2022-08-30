import { Datum } from '@angel-oak/utils/date/datum';
import { IDateTime_Time } from './schema';

export default {
	init: (date: Datum, time: IDateTime_Time.Api): IDateTime_Time => {
		date.setUTCHours(time.hour);
		date.setUTCMinutes(time.minute);
		return date;
	},
	serialize: (time: Datum): IDateTime_Time.Api => {
		return {
			hour: time.hour,
			minute: time.minute,
		};
	},
};
