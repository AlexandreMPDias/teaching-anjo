import { useAsyncCall } from '@angel-oak/poseidon';
import { BillSubscriptionRepo as Repo } from '@angel-oak/core/repositories/use-cases/bill-subscription';

export const useBillSubscriptionCreate = () => {
	const create = useAsyncCall(async (payload: Repo.Create) => {
		await Repo.create(payload);
	}, []);

	return create;
};
