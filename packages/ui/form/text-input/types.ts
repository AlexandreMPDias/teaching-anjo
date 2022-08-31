import { InputProps } from '@chakra-ui/react';
import { MaskProps } from './components/masked-input';

export interface ITextInputProps extends InputProps {
	label: string;
	error?: string | undefined | null;
	mask?: MaskProps;
}
