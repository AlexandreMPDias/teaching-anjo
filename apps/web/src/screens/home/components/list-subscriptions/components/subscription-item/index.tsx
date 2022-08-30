import { Box, Flex, Grid, Skeleton } from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { Typo } from '@angel-oak/ui/infos/typography';
import { Card } from '@angel-oak/ui/layouts/card';
import { SuscriptionBillDateInfo, SuscriptionBillActionButton, PaymentDate } from './components';
import { useBillPay } from '~/business/bill/use-pay';
import { useBillListen } from '~/business/bill/use-listen';
import { useEffect } from 'react';
import useGlobalLoaderLocally from '@angel-oak/ui/providers/global-loader/utility';

export const BillSubscriptionView: React.FC<{ subscription: IBillSubscription }> = (props) => {
	const bill = useBillListen();
	const pay = useBillPay(bill.value);

	useGlobalLoaderLocally('bill.pay', pay.running);

	useEffect(() => bill.subscribe('x'), []);

	return (
		<Skeleton isLoaded={!bill.loading} w="100%">
			<Card p="4px" w="100%">
				<Grid
					gap="5px"
					gridTemplateColumns={'60px 1fr 0.3fr'}
					justifyContent={'center'}
					alignItems="center"
					w="100%"
				>
					<SuscriptionBillActionButton
						subscription={props.subscription}
						onPay={() => {
							console.log('paying');
							pay();
						}}
					>
						{props.children}
					</SuscriptionBillActionButton>
					<Flex flexDir={'column'} flexGrow={1} justifyContent="flex-start">
						<Typo.Title>{props.subscription.name}</Typo.Title>
						<PaymentDate subscription={props.subscription} />
					</Flex>
					<Box>
						<SuscriptionBillDateInfo subscription={props.subscription} />
					</Box>
				</Grid>
			</Card>
		</Skeleton>
	);
};
