import { useState, useCallback, useMemo, SetStateAction, Dispatch } from 'react';
import { ObjectState } from '../use-object-state';

export interface BooleanState extends Omit<ObjectState<boolean>, 'append'> {
	/**
	 * Toggles the boolean value
	 */
	toggle(): void;

	/**
	 * Sets the boolean value to [true]
	 */
	on(): void;

	/**
	 * Sets the boolean value to [false]
	 */
	off(): void;
}

const useFromState = (state: [boolean, Dispatch<SetStateAction<boolean>>]): BooleanState => {
	const [value, setValue] = state;

	const on = useCallback(() => setValue(true), [setValue]);
	const off = useCallback(() => setValue(false), [setValue]);

	const booleanState = {
		value,
		set: setValue,
		toggle: useCallback(() => setValue((prev) => !prev), [setValue]),
		on,
		off,
	};

	return useMemo(() => booleanState, [value, setValue]);
};

const useBooleanStateFn = (initial: boolean): BooleanState => {
	return useFromState(useState<boolean>(initial));
};

export const useBooleanState = Object.assign(useBooleanStateFn, { fromState: useFromState });
