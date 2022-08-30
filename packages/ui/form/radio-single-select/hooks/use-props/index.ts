import { useMemo } from 'react';
import { ItemsContainer } from '../../components';
import { IRadioSelectProps, IRadioSelectOption, IRadioSelectBaseOption } from '../../types';
import { useComponentsInProps } from './use-components-in-props';
import { useSerializerCallback } from './use-serialize-callbacks';

export const useRadioProps = <V>(props: IRadioSelectProps<V>) => {
	const keyExtractor = useSerializerCallback(props.keyExtractor);
	const labelExtractor = useSerializerCallback(props.labelExtractor);

	const defaultValue = keyExtractor(props.defaultValue);
	const selected = useMemo(() => {
		return props.value ? keyExtractor(props.value) : defaultValue;
	}, [props.value, defaultValue, keyExtractor]);

	const baseOptions = useMemo((): readonly IRadioSelectBaseOption<V>[] => {
		return props.options.map((item): IRadioSelectBaseOption<V> => {
			const key = keyExtractor(item);
			return {
				value: item,
				key,
			};
		});
	}, [props.options, keyExtractor]);

	const options = useMemo((): readonly IRadioSelectOption<V>[] => {
		return baseOptions.map((item): IRadioSelectOption<V> => {
			return {
				...item,
				selected: Boolean(selected && item.key === selected),
				label: labelExtractor(item.value),
			};
		});
	}, [baseOptions, labelExtractor, selected]);

	return {
		defaultValue,
		selected,
		options: {
			base: baseOptions,
			full: options,
		},
		ItemsContainer: useComponentsInProps(props.ItemsContainer, ItemsContainer),
	};
};
