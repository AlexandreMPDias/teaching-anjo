import { Box, BoxProps } from '@chakra-ui/react';

export type IRadioSliderItemsContainerProps = BoxProps;

export const ItemsContainer: React.FC<IRadioSliderItemsContainerProps> = ({
	children,
	...props
}) => {
	return <Box {...props}>{children}</Box>;
};
