import { useState, useCallback, useMemo } from 'react';
import { makeLazyContext } from '@angel-oak/poseidon/helpers/make-lazy-context';

const updateSet = (callback: (set: Set<string>) => void) => {
	return (prev: Set<string>) => {
		const newSet = new Set(prev);
		callback(newSet);
		return newSet;
	};
};

export const makeGlobalLoaderContextProvider = () => {
	const [loadingSet, setLoadingSet] = useState<Set<string>>(() => new Set<string>());

	const add = useCallback((key: string) => setLoadingSet(updateSet((prev) => prev.add(key))), []);
	const rm = useCallback(
		(key: string) => setLoadingSet(updateSet((prev) => prev.delete(key))),
		[]
	);

	const isLoading = useMemo(() => loadingSet.size !== 0, [loadingSet]);

	return {
		loadingSet,
		add,
		rm,
		isLoading,
	};
};

export default makeLazyContext(makeGlobalLoaderContextProvider);
