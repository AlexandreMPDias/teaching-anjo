import { useRef, useEffect } from 'react';
import { BooleanState, useBooleanState } from '../../../use-boolean-state';
import { AsyncCallbackModel } from '../types';

export const useAsyncCallState = <A extends any[], R>(
	model: AsyncCallbackModel<A, R>
): AsyncCallbackState<A, R> => {
	const running = useBooleanState(model.options.initial ?? false);
	const mountRef = useRef<boolean>(false);
	const isEnabled = useRef<(...args: A) => boolean>();

	useEffect(() => {
		if ('enabled' in model.options) {
			const enabled = model.options.enabled;
			if (typeof enabled === 'function') {
				model.options.enabled;
				isEnabled.current = enabled;
			} else {
				isEnabled.current = () => !!enabled;
			}
		} else {
			isEnabled.current = () => true;
		}
	}, [model.options.enabled]);

	return {
		running,
		mountRef,
		isEnabled,
	};
};

export interface AsyncCallbackState<A extends any[], R> {
	running: BooleanState;
	mountRef: React.MutableRefObject<boolean>;
	isEnabled: React.MutableRefObject<((...args: A) => boolean) | undefined>;
}
