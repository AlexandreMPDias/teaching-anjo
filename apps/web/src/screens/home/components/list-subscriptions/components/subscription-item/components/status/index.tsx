import { Box } from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { CheckCircleIcon as ActiveIcon, SmallCloseIcon as InactiveIcon } from '@chakra-ui/icons';

type IconProps = Parameters<typeof InactiveIcon>[0];

export interface ISubscriptionStatusContentProps extends IconProps {
	status: IBillSubscription.Status;
}

const SubscriptionStatusContent: React.FC<ISubscriptionStatusContentProps> = ({
	status,
	...props
}) => {
	if (status === 'inactive') {
		return <InactiveIcon {...props} color="warning" />;
	}

	return <ActiveIcon {...props} color="success" />;
};

export const SubscriptionStatus: React.FC<{ status: IBillSubscription.Status }> = (props) => {
	return (
		<Box p="10px">
			<SubscriptionStatusContent status={props.status} h="20px" w="20px" />
		</Box>
	);
};
