import { IDateTime_Date as DTDate } from './date/schema';
import { IDateTime_Time as DTTime } from './time/schema';

export type IDateTime = IDateTime.Api;

export declare namespace IDateTime {
	export type Weekday = DTDate.Weekday;

	export type Date = DTDate.Api;

	export namespace Date {
		export type Api = DTDate.Api;
	}

	export type Time = DTTime.Api;

	export namespace Time {
		export type Api = DTTime.Api;
	}

	export type Api = Date.Api & Time.Api;
}
