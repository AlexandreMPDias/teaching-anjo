import { Box, BoxProps, Spinner, Flex } from '@chakra-ui/react';

export interface IScreenProps extends BoxProps {
	/**
	 * Some async operation is loading or not
	 *
	 * @default {false}
	 */
	isLoading?: boolean;

	containerProps?: BoxProps;
}

const ScreenFlex: React.FC<IScreenProps> = ({ containerProps, ...props }) => {
	return (
		<Box
			w="100%"
			h="100%"
			maxHeight="100vh"
			bg="background.page"
			overflow="hidden"
			mx="auto"
			{...containerProps}
		>
			<Box
				w="100%"
				h="100%"
				maxW="500px"
				maxHeight="100vh"
				p="10px"
				mx="auto"
				overflow="hidden"
				{...props}
			>
				{props.isLoading ? (
					<Flex height="100%" justifyContent="center" alignContent="center">
						<Spinner alignSelf="center" />
					</Flex>
				) : (
					props.children
				)}
			</Box>
		</Box>
	);
};

export const Screen: React.FC<IScreenProps> = (p) => {
	const { bottom, ...props } = p;

	return <ScreenFlex {...props} />;
};

Screen.defaultProps = {};
