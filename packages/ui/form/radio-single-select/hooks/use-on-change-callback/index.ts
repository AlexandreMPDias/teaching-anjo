import { useCallback, useMemo } from 'react';
import { IRadioSelectBaseOption, IRadioSelectProps } from '../../types';

export const useOnChangeCallback = <V>(
	props: IRadioSelectProps<V>,
	options: readonly IRadioSelectBaseOption<V>[]
) => {
	const optionsMap = useMemo(() => {
		const out: Record<string, IRadioSelectBaseOption<V>> = {};
		options.forEach((item) => {
			out[item.key] = item;
		});
		return out;
	}, [options]);

	return useCallback(
		(nextKey: string) => {
			const next = optionsMap[nextKey];
			if (!next) return;
			props.onChange?.(next.value);
		},
		[optionsMap, props.onChange]
	);
};
