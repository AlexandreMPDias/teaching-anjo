import { Datum } from '@angel-oak/utils/date/datum';
import { IDateTime } from '../../etc/date-time/schema';

export interface IBill extends IBill.Front {}

export declare namespace IBill {
	export type Status = 'paid' | 'not-paid';

	export interface Common {
		readonly id: number;
		readonly uuid: string;
		readonly status: IBill.Status;
		readonly subscription: string;
	}

	export interface Api extends Common {
		readonly date: IDateTime.Date;
	}

	export interface Front extends Common {
		readonly date: Datum;
	}

	export interface Create extends Common {
		readonly date: Datum;
	}
}
