import { Datum } from '@angel-oak/utils/date/datum';
import { Timestamp } from 'firebase/firestore';

export interface IDbDate extends IDbDate.Front {}

export declare namespace IDbDate {
	export type Api = Timestamp | Date;

	export type Front = Datum;
}
