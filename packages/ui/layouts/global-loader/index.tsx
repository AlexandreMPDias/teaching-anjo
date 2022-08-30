import { Center, Spinner } from '@chakra-ui/react';

export interface IGlobalLoaderComponentProps {
	loading: boolean;
}

export const GlobalLoaderComponent: React.FC<IGlobalLoaderComponentProps> = (props) => {
	if (!props.loading) return null;

	return (
		<Center position={'absolute'} top={0} left={0} w="100vw" h="100vh" bg="rgba(0,0,0,0.5)">
			<Center w="200px" h="300px" bg={'gray.200'} boxShadow="md" borderRadius="5px">
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</Center>
		</Center>
	);
};
