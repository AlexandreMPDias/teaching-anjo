import { ForwardedRef } from 'react';

export const updateForwardedRef = <V>(ref: ForwardedRef<V>, value: V) => {
	if (!ref) return;
	if (typeof ref === 'function') ref(value);
	else ref.current = value;
};
