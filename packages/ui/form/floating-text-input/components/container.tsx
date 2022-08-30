import { BoxProps, Box } from '@chakra-ui/react';

export interface IFloatingTextInputContainerProps extends BoxProps {}

export const InputContainer: React.FC<IFloatingTextInputContainerProps> = ({
	children,
	...props
}) => {
	return <Box {...props}>{children}</Box>;
};

InputContainer.defaultProps = {
	mt: '15px',
};
