import { IDbDate } from '../../db-date/schema';
import { Timestamp } from 'firebase/firestore';

export interface IDateTime_Date extends IDateTime_Date.Front {}

export declare namespace IDateTime_Date {
	export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	export interface Common {
		readonly year: number;
		readonly month: number;
		readonly day: number;
		readonly weekday: Weekday;
	}

	export interface Api extends Common {
		readonly source: Timestamp | null;
	}

	export type Front = IDbDate;
}
