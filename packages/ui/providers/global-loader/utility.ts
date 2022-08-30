import { useCallback, useMemo, useEffect } from 'react';
import Context from './load';

const useGlobalLoaderLocallyWithoutLocalState = (key: string) => {
	const ctx = Context.useContext();

	const start = useCallback(() => ctx.add(key), [ctx.add, key]);
	const stop = useCallback(() => ctx.rm(key), [ctx.rm, key]);

	const isLoading = useMemo(() => ctx.loadingSet.has(key), [ctx.loadingSet, key]);

	return {
		isLoading,
		start,
		stop,
	};
};

const useGlobalLoaderLocallyWithLocalState = (key: string, value: boolean) => {
	const state = useGlobalLoaderLocallyWithoutLocalState(key);

	const illegal = useCallback(() => {
		throw new Error(`global.loader.${key} cant update`);
	}, []);

	useEffect(() => {
		if (value) {
			state.start();
		} else {
			state.stop();
		}
	}, [value]);

	return {
		isLoading: value,
		start: illegal,
		stop: illegal,
	};
};

const useGlobalLoaderLocally = (key: string, ...args: [value: boolean] | []) => {
	if (args.length === 0) {
		return useGlobalLoaderLocallyWithoutLocalState(key);
	}
	return useGlobalLoaderLocallyWithLocalState(key, args[0]);
};

export default useGlobalLoaderLocally;
