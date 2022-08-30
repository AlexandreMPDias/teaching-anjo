import { IBill } from '@angel-oak/core/models/schemas';
import { useBooleanState, useObjectState } from '@angel-oak/poseidon';
import { BillRepo as Repo } from '@angel-oak/core/repositories/use-cases/bill';
import { useCallback } from 'react';

export const useBillListen = () => {
	const bill = useObjectState<IBill | null>(null);
	const load = useBooleanState(false);

	const subscribe = useCallback((uuid: string) => {
		load.on();
		return Repo.listen(uuid, (snapshot) => {
			if (snapshot.exists()) {
				bill.set(snapshot.data());
			}
			load.off();
		});
	}, []);

	return {
		exists: !load.value && bill.value !== null,
		value: bill.value,
		loading: load.value,
		subscribe,
	};
};
