import { useMemo } from 'react';

type MutationCallback<T, Args extends any[]> = (...args: Args) => T;

export const useMutatedValue = <T, Args extends any[]>(
	deps: Args,
	mutation: MutationCallback<T, Args>
): T => {
	return useMemo(() => mutation(...deps), deps);
};
