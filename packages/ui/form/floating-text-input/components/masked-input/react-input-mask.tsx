import IM, { Props } from 'react-input-mask';

export interface ReactMaskProps extends Omit<Props, 'children'> {
	children: (inputProps: any) => React.ReactNode;
}

const InputMask = IM as unknown as React.FC<ReactMaskProps>;

export default InputMask;
