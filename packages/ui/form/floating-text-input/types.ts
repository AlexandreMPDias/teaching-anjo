import { InputProps } from '@chakra-ui/react';
import { MaskProps } from './components/masked-input';

export interface IFloatingTextInputProps extends InputProps {
	label: string;
	error: string | undefined;
	mask?: MaskProps;
}
