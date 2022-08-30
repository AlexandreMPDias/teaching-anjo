import { useAsyncCall, useObjectState } from '@angel-oak/poseidon';
import { BillSubscriptionRepo as Repo } from '@angel-oak/core/repositories/use-cases/bill-subscription';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { useCallback, useEffect, useRef } from 'react';

type Output = [
	{
		list: readonly IBillSubscription[];
		loading: false;
	},
	{
		list: undefined;
		loading: true;
	}
][number] & {
	refresh(): Promise<void>;
};

export const useBillSubscriptionList = (): Output => {
	const list = useObjectState<readonly IBillSubscription[]>();
	const prevPayload = useRef<Repo.List>();

	const fetch = useAsyncCall(
		async (payload?: Repo.List) => {
			prevPayload.current = payload;
			return list.set(await Repo.list(payload));
		},
		{ initial: true },
		[]
	);

	const refresh = useCallback(() => fetch(prevPayload.current), [fetch]);

	useEffect(() => {
		refresh();
	}, []);

	return {
		list: list.value,
		loading: fetch.running,
		refresh,
	} as any;
};
