import { useState, useCallback, useMemo, SetStateAction, Dispatch } from 'react';
import { always } from 'ramda';

type SetPartialStateAction<S> = ((prev: Readonly<S>) => Partial<S>) | Partial<S>;
type SetAnyStateAction<S> = S extends Record<string, any>
	? SetPartialStateAction<S>
	: SetStateAction<S>;
export interface ObjectState<S> {
	readonly value: Readonly<S>;
	readonly set: Dispatch<SetStateAction<S>>;
	readonly append: Dispatch<SetAnyStateAction<S>>;
}

type IUseObjectState = {
	<S>(initialState: S | (() => S)): ObjectState<S>;
	<S = undefined>(): ObjectState<S | undefined>;
};

const getType = (prev: any, next: any) => {
	const firstDefinedValue = [prev, next].find(x => x !== undefined);
	if (firstDefinedValue === undefined) return 'object';
	return typeof firstDefinedValue;
};

export const useObjectState: IUseObjectState = (initial?: any) => {
	const [value, setValue] = useState<any>(initial);

	const append = useCallback(
		(dispatch: SetStateAction<any>) => {
			setValue((prev: any) => {
				const callback = typeof dispatch === 'function' ? dispatch : always(dispatch);
				const partialNext = callback(prev);

				if (getType(prev, partialNext) !== 'object') {
					return partialNext;
				}
				if (Array.isArray(partialNext)) {
					return [...prev, ...partialNext];
				} else {
					return { ...prev, ...partialNext };
				}
			});
		},
		[setValue]
	);

	return useMemo(
		() => ({
			value,
			set: setValue,
			append,
		}),
		[value, setValue, append]
	);
};
