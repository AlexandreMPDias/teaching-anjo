import { makeWithInitMany } from '../../helpers/make-init-many';
import { DateTime } from '../../schemas';
import { IBill } from './schema';

export const Bill = {
	...makeWithInitMany((bill: IBill.Api): IBill => {
		return {
			...bill,
			date: DateTime.init.date(bill.date),
		};
	}),
	create: (bill: IBill.Create): IBill.Api => {
		const { date, id, status, subscription, uuid } = bill;

		return {
			id,
			status,
			subscription,
			uuid,
			date: DateTime.serialize.date(date),
		};
	},
};
