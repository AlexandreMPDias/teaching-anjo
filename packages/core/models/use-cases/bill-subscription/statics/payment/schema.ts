import { Datum } from '@angel-oak/utils/date/datum';
import { IDbDate } from '../../../../etc/db-date/schema';

export interface IBillSubscriptionPayment extends IBillSubscriptionPayment.Front {}

export declare namespace IBillSubscriptionPayment {
	export type Status = keyof {
		/**
		 * Next payment is due
		 */
		paid: never;

		/**
		 * Next payment is not due
		 */
		pending: never;

		/**
		 * Next payment is late
		 */
		overdue: never;
	};

	export interface Common {}

	export interface Api extends Common {
		readonly lastPayment: IDbDate.Api | null;
		readonly nextPayment: IDbDate.Api | null;
		readonly paymentStatus: Status;
	}

	export interface Front extends Common {
		readonly last: Datum | null;
		readonly next: Datum | null;
		readonly status: Status;
	}

	export interface Create {}
}
