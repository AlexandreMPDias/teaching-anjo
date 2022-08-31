import { Button, useDisclosure, Center } from '@chakra-ui/react';
import { Screen } from '@angel-oak/ui/layouts/screen';

export const HomeScreen: React.FC = () => {
	const addSubscription = useDisclosure();

	return (
		<Screen display="flex" flexDirection={'column'} pb="20px">
			<Center pt="10px" flexGrow={1} alignItems="flex-start"></Center>
			<Button mx="auto" onClick={addSubscription.onOpen}>
				{'Add Subscription'}
			</Button>
		</Screen>
	);
};
