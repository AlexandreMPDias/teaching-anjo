import * as statics from './statics';
import { IBillSubscriptionPayment as IPayment } from './schema';
import { DbDate } from '../../../../etc/db-date';

export const Payment = {
	init: (payment: IPayment.Api): IPayment => {
		return {
			last: DbDate.init.null(payment.lastPayment),
			next: DbDate.init.null(payment.nextPayment),
			status: payment.paymentStatus,
		};
	},
	create: (_: IPayment.Create): IPayment.Api => {
		return {
			lastPayment: null,
			nextPayment: null,
			paymentStatus: 'pending',
		};
	},
	...statics,
};
