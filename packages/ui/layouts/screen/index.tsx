import { Box, BoxProps, Spinner, Flex } from '@chakra-ui/react';

export interface IScreenProps extends BoxProps {
	/**
	 * Some async operation is loading or not
	 *
	 * @default {false}
	 */
	isLoading?: boolean;
}

const Loading: React.FC<{ loading: boolean }> = ({ children, loading }) => {
	if (!loading) {
		return <>{children}</>;
	}

	return (
		<Flex flexGrow={1} justifyContent="center" alignContent="center">
			<Spinner alignSelf="center" />
		</Flex>
	);
};

export const Screen: React.FC<IScreenProps> = ({ isLoading, children, ...props }) => {
	return (
		<Box textAlign={'center'} w="100%" h="100%" bg="background.page" mx="auto" {...props}>
			<Loading loading={!!isLoading}>{children}</Loading>
		</Box>
	);
};

Screen.defaultProps = {};
