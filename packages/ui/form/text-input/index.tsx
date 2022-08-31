import { FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { ITextInputProps } from './types';
import { MaskedInput, InputContainer } from './components';

export const TextInput: React.FC<ITextInputProps> = ({ mask, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	const { mt, pt, ...withoutStyleProps } = props;
	const containerProps = { mt, pt };

	return (
		<InputContainer {...containerProps}>
			<FormLabel htmlFor={props.label} textTransform="capitalize">
				{props.label}
			</FormLabel>
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
			<FormErrorMessage>{props.error}</FormErrorMessage>
		</InputContainer>
	);
};

TextInput.defaultProps = {
	placeholder: ' ',
};

export declare namespace FloatingTextInput {
	export type Props = ITextInputProps;
}
