import { Button, useDisclosure, Center } from '@chakra-ui/react';
import { Screen } from '@angel-oak/ui/layouts/screen';
import { AddSubscriptionModal, ListSubscriptionsScreen } from './components';
import { useEffect, useRef } from 'react';

export const HomeScreen: React.FC = () => {
	const addSubscription = useDisclosure();

	const listRef = useRef<ListSubscriptionsScreen.Ref>(null);

	// useEffect(() => {
	// 	addSubscription.onOpen();
	// }, []);

	return (
		<Screen display="flex" flexDirection={'column'} pb="20px">
			<Center pt="10px" flexGrow={1} alignItems="flex-start">
				<ListSubscriptionsScreen ref={listRef} />
			</Center>
			<Button mx="auto" onClick={addSubscription.onOpen}>
				{'Add Subscription'}
			</Button>
			<AddSubscriptionModal
				{...addSubscription}
				onSuccess={() => {
					addSubscription.onClose();
					listRef.current?.refresh();
				}}
			/>
		</Screen>
	);
};
