import { IDbDate } from '../../db-date/schema';

export interface IDateTime_Time extends IDateTime_Time.Front {}

export declare namespace IDateTime_Time {
	export interface Common {
		readonly hour: number;
		readonly minute: number;
	}

	export interface Api extends Common {}

	export type Front = IDbDate;
}
