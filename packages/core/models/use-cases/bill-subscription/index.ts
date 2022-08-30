import { DbDate } from '../../etc/db-date';
import { makeWithInitMany } from '../../helpers/make-init-many';
import { IBillSubscription } from './schema';
import * as statics from './statics';
import * as getters from './getters';

export const BillSubscription = {
	...makeWithInitMany((bill: IBillSubscription.Api): IBillSubscription => {
		const partial: IBillSubscription = {
			...bill,
			start: DbDate.init(bill.start),
			end: bill.end ? DbDate.init(bill.end) : null,
			payment: statics.Payment.init(bill),
		};

		if (!bill.nextPayment) {
			const nextPaymentDate = getters.nextPaymentDate({
				frequency: bill.frequency,
				startDate: partial.start,
				endDate: partial.end,
				prevPaymentDate: partial.payment.last,
			});
			Object.assign(partial.payment, { next: nextPaymentDate });
		}

		return partial;
	}),
	create: (subscription: IBillSubscription.Create): IBillSubscription.Api => {
		const { frequency, uuid, id, tags, start, name } = subscription;

		const end = DbDate.init.null(subscription.end);

		const nextPaymentDate = getters.nextPaymentDate({
			frequency,
			startDate: start,
			endDate: end,
			prevPaymentDate: null,
		});

		return {
			name,
			frequency,
			uuid,
			id,
			start,
			status: 'active',
			end: end ? end.toDate() : null,
			lastPayment: null,
			nextPayment: nextPaymentDate,
			paymentStatus: 'pending',
			tags: tags || [],
			nextBill: null,
		};
	},
	...statics,
};
