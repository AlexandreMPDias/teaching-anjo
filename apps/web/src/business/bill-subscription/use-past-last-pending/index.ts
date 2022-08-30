import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { useAsyncCall } from '@angel-oak/poseidon';
import { BillSubscriptionRepo as SubscriptionRepo } from '@angel-oak/core/repositories/use-cases/bill-subscription';
import { BillRepo } from '@angel-oak/core/repositories/use-cases/bill';

export const useBillSubscriptionPayLastPending = (subscription: IBillSubscription) => {
	const pay = useAsyncCall(async () => {
		// await Repo.pay(payload);
	}, []);

	return pay;
};
