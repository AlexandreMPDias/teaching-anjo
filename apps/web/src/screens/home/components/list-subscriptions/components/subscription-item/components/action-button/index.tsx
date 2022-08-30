import React from 'react';
import {
	CenterProps,
	Center,
	FormErrorMessage,
	FormControl,
	Tooltip,
	Button,
	ButtonProps,
	Flex,
} from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Typo } from '@angel-oak/ui/infos/typography';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';

const { Payment } = BillSubscription;

type IProps = {
	readonly subscription: IBillSubscription;
	onPay(): void;
};

const ActionButtonContent: React.FC<IProps> = (props) => {
	const { payment } = props.subscription;

	const iconProps = {
		boxSize: '25px',
	};

	if (payment.status === 'paid') {
		return <CheckCircleIcon color="success" {...iconProps} />;
	}
	if (payment.status === 'pending') {
		return <InfoIcon {...iconProps} color="orange" />;
	}
	if (payment.status === 'overdue') {
		return (
			<>
				<WarningTwoIcon {...iconProps} color="warning" />
				<Typo.Small>Pay Now!</Typo.Small>
				<FormControl isInvalid>
					<Center>
						<FormErrorMessage m={0} userSelect={'none'}>
							Late!
						</FormErrorMessage>
					</Center>
				</FormControl>
			</>
		);
	}
	return null;
};

const tooltipLabel = Payment.PaymentStatus.composeSelector()({
	paid: 'Take it easy! This was already paid',
	pending: 'The payment for this period is still pending',
	overdue: 'Payment is late! Pay it rightaway',
});

const getContainer = Payment.PaymentStatus.composeSelector()<React.FC<CenterProps & ButtonProps>>({
	paid: Center,
	default: Button,
});

export const SuscriptionBillActionButton: React.FC<CenterProps & IProps & ButtonProps> = (
	props
) => {
	const { subscription, onPay, ...boxProps } = props;
	const contentProps = { subscription, onPay };
	const Container = getContainer(subscription.payment.status);

	const onClick = Payment.PaymentStatus.composeSelector(subscription.payment.status)({
		paid: undefined,
		default: onPay,
	});

	return (
		<Container {...boxProps} onClick={onClick} variant="icon" minH="60px" p="5px">
			<Tooltip hasArrow label={tooltipLabel(subscription.payment.status)}>
				<Flex flexDir="column" alignItems={'center'} justifyContent="center">
					<ActionButtonContent {...contentProps} />
				</Flex>
			</Tooltip>
		</Container>
	);
};
