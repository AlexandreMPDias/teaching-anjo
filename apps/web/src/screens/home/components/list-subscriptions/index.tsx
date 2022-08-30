import { Box, Flex } from '@chakra-ui/react';
import { ForwardedRef as FRef, forwardRef } from 'react';
import { useBillSubscriptionList } from '~/business/bill-subscription/use-list';
import { updateForwardedRef } from '@angel-oak/ui/helpers/update-forwarded-ref';
import { EmptyListOfSubscriptions } from './components/empty';
import { LoadingListOfSubscriptions } from './components/loading';
import { BillSubscriptionView } from './components/subscription-item';
import { useBillListen } from '~/business/bill/use-listen';

type ListRef = {
	refresh(): Promise<void>;
};

export const ListSubscriptionsScreen = forwardRef((_, ref: FRef<ListRef>) => {
	const bill = useBillListen();
	const subscriptions = useBillSubscriptionList();

	updateForwardedRef(ref, subscriptions);

	if (subscriptions.loading) {
		return <LoadingListOfSubscriptions />;
	}
	if (subscriptions.list.length === 0) {
		return <EmptyListOfSubscriptions />;
	}

	return (
		<Flex gap="8px" flexDirection={'column'} alignItems="flex-start">
			{subscriptions.list.map((subscription) => (
				<BillSubscriptionView key={subscription.uuid} subscription={subscription}>
					<Box bg="red" boxSize="20px" />
				</BillSubscriptionView>
			))}
		</Flex>
	);
});

export declare namespace ListSubscriptionsScreen {
	export type Ref = ListRef;
}
