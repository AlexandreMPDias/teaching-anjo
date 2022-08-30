import { Datum } from '@angel-oak/utils/date/datum';
import { IDbDate } from '../../etc/db-date/schema';
import { IBillSubscriptionPayment } from './statics/payment/schema';

export type IBillSubscription = IBillSubscription.IBillSubscription;

export declare namespace IBillSubscription {
	export type Frequency = keyof {
		/**
		 * Repeats every week
		 */
		weekly: never;

		/**
		 * Repeats every month
		 */
		monthly: never;

		/**
		 * Repeats every year
		 */
		yearly: never;

		/**
		 * Never repeats
		 */
		aperiodic: never;
	};

	export type Status = keyof {
		/**
		 * Subscription is active
		 */
		active: never;

		/**
		 * Subscription is not active
		 * Inactive Subscriptions are not billed
		 */
		inactive: never;
	};

	export interface Common {
		readonly id: number;
		readonly uuid: string;
		readonly frequency: Frequency;
		readonly name: string;
		readonly tags: string[];
		readonly nextBill: string | null;
		readonly status: Status;
	}

	export interface Api extends Common {
		readonly paymentStatus: Payment.Status;
		readonly lastPayment: IDbDate.Api | null;
		readonly nextPayment: IDbDate.Api | null;
		readonly start: IDbDate.Api;
		readonly end: IDbDate.Api | null;
	}

	export interface IBillSubscription extends Common {
		readonly payment: IBillSubscriptionPayment;
		readonly start: Datum;
		readonly end: Datum | null;
	}

	export interface Create {
		readonly id: number;
		readonly name: string;
		readonly uuid: string;
		readonly frequency: Frequency;
		readonly start: Datum;
		readonly tags?: string[];
		readonly end?: Datum | null;
	}
}

export declare namespace IBillSubscription {
	export interface Payment extends IBillSubscriptionPayment {}

	export namespace Payment {
		export type Status = IBillSubscriptionPayment.Status;
	}
}
