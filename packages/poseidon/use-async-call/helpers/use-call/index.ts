import { useCallback } from 'react';
import { AsyncCallbackModel } from '../types';
import { AsyncCallbackState } from '../use-state';

const useCallWrapper = <A extends any[], R>(
	model: AsyncCallbackModel<A, R>,
	state: AsyncCallbackState<A, R>
) => {
	const call = useCallback(
		async (...args: A): Promise<Awaited<R | null>> => {
			if (state.isEnabled.current && !state.isEnabled.current(...args)) return null;
			state.running.on();
			try {
				const ret: Awaited<R> = await model.callback(...args);
				return ret;
			} catch (error) {
				if ('onError' in model.options && model.options.onError) {
					if (error instanceof Error) {
						model.options.onError(error, ...args);
						return null;
					}
				}
				throw error;
			} finally {
				if (state.mountRef.current) {
					// Otherwise, updates states on unmounted component (aka: Memory Leak)
					state.running.off();
				}
			}
		},
		[...model.deps, state.running]
	);

	return call;
};

export default useCallWrapper;
