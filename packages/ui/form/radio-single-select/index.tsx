import { FormControl, FormLabel, useRadioGroup, forwardRef, Box } from '@chakra-ui/react';
import { objectFocus } from '@angel-oak/utils/object/focus';
import { useRadioProps } from './hooks/use-props';
import { useOnChangeCallback } from './hooks/use-on-change-callback';
import { RadioSelectOptionCard } from './components/option-card';
import { IRadioSelectProps, FC } from './types';

export const RadioSingleSelect: FC = forwardRef((props: IRadioSelectProps<unknown>, ref) => {
	const { options, defaultValue, selected, ItemsContainer } = useRadioProps(props);
	const propsFocus = objectFocus(props);

	const onChange = useOnChangeCallback(props, options.base);

	const formControlProps = propsFocus.pick(['isNative', 'isDisabled', 'isFocusable']);

	const { getRootProps, getRadioProps } = useRadioGroup({
		...formControlProps,
		...propsFocus.pick(['name']),
		defaultValue: defaultValue || undefined,
		onChange,
		value: selected || undefined,
	});

	const field = propsFocus.pick(['checked', 'onBlur', 'onChange', 'value', 'multiple', 'name']);

	return (
		<FormControl {...formControlProps} pb="20px" pt="10px">
			<FormLabel as="legend">{props.label}</FormLabel>
			<Box ref={ref} {...field} {...getRootProps()}>
				<ItemsContainer {...props.itemsContainerProps}>
					{options.full.map((value) => (
						<RadioSelectOptionCard
							key={value.key}
							{...getRadioProps({ value: value.key })}
						>
							{value.label}
						</RadioSelectOptionCard>
					))}
				</ItemsContainer>
			</Box>
			{/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
		</FormControl>
	);
}) as any;
