import { Flex, Skeleton, Grid } from '@chakra-ui/react';

const Skelly = () => <Skeleton height="40px" startColor="green.300" endColor="blue.600" />;

export const LoadingListOfSubscriptions: React.FC = () => {
	return (
		<Grid gap="10px">
			<Skelly />
			<Skelly />
			<Skelly />
		</Grid>
	);
};
