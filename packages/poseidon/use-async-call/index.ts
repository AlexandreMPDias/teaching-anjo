import { useEffect } from 'react';
import {
	AsyncCallback,
	AsyncCallbackParams as Params,
	AsyncCallbackOptions,
} from './helpers/types';
import parseAsyncCallbackParameters from './helpers/parse-parameters';
import { useAsyncCallState } from './helpers/use-state';
import useCall from './helpers/use-call';

export const useAsyncCall = <A extends any[], R>(...args: Params<A, R>): AsyncCallback<A, R> => {
	const model = parseAsyncCallbackParameters<A, R>(...args);
	const state = useAsyncCallState<A, R>(model);

	useEffect(() => {
		state.mountRef.current = true;
		return () => {
			state.mountRef.current = false;
		};
	}, []);

	const call = useCall(model, state);

	return Object.assign(call, {
		/**
		 * Indicates if the function is still being executed
		 */
		running: state.running.value,
	});
};

export declare namespace useAsyncCall {
	export type Callback<A extends any[] = any[], R = Promise<void>> = AsyncCallback<A, R>;
	export type Options<A extends any[] = any[], R = Promise<void>> = AsyncCallbackOptions<A, R>;
}
