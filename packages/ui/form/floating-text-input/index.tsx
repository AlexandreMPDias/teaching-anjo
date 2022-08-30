import { Input, FormLabel, FormErrorMessage, InputProps, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { IFloatingTextInputProps } from './types';
import { MaskedInput, InputContainer } from './components';

export const FloatingTextInput: React.FC<IFloatingTextInputProps> = ({ mask, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	const { mt, pt, ...withoutStyleProps } = props;
	const containerProps = { mt, pt };

	return (
		<InputContainer {...containerProps}>
			<MaskedInput
				{...props}
				mask={mask}
				onFocus={(e) => {
					setIsFocused(true);
					props.onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					props.onBlur?.(e);
				}}
				placeholder={isFocused ? props.placeholder : ' '}
			/>
			<FormLabel htmlFor={props.label} textTransform="capitalize">
				{props.label}
			</FormLabel>
			<FormErrorMessage>{props.error}</FormErrorMessage>
		</InputContainer>
	);
};

FloatingTextInput.defaultProps = {
	placeholder: ' ',
};

export declare namespace FloatingTextInput {
	export type Props = IFloatingTextInputProps;
}
