import { Input, InputProps } from '@chakra-ui/react';
import InputMask, { ReactMaskProps } from './react-input-mask';

export type MaskProps = Omit<ReactMaskProps, 'children'>;

export interface IMaskedInputProps extends InputProps {
	mask: MaskProps | undefined;
}

export const MaskedInput: React.FC<IMaskedInputProps> = ({ children, mask, ...props }) => {
	if (mask) {
		const { value, onChange, onBlur, onFocus, ...remainingProps } = props;
		const maskProps = { value, onChange, onBlur, onFocus };

		return (
			<InputMask {...mask} {...(props as any)}>
				{(inputProps: any) => <Input {...inputProps}>{children}</Input>}
			</InputMask>
		);
	}

	return <Input {...props}>{children}</Input>;
};
