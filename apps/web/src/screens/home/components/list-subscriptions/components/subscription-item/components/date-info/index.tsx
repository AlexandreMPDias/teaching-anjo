import { useMemo } from 'react';
import { BoxProps, Box, Tag, TagProps, VStack } from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { useSubscriptionFrequencyDateInfo } from '../../hooks/use-tags/frequency-date-info';
import { useFrequencyLabelTag } from '../../hooks/use-tags/frequency-label';

export const getFrequencyValueTag = (subscription: IBillSubscription) => {
	return useMemo(
		() => ({
			label: BillSubscription.Frequency.getDateInfo(subscription),
			color: 'white',
			bg: 'brown',
		}),
		[subscription.start, subscription.frequency]
	);
};

const MyTag: React.FC<TagProps & { label: string }> = ({ label, ...props }) => {
	return (
		<Tag userSelect="none" {...props}>
			{label}
		</Tag>
	);
};

export type ISuscriptionBillDateInfoProps = BoxProps & {
	readonly subscription: IBillSubscription;
};

export const SuscriptionBillDateInfo: React.FC<ISuscriptionBillDateInfoProps> = (props) => {
	const { subscription, ...boxProps } = props;

	// const dateInfo = useSubscriptionFrequencyDateInfo(subscription);
	const labelTag = useFrequencyLabelTag(subscription);

	return (
		<VStack {...boxProps} alignItems="flex-end">
			<MyTag {...labelTag} />
			{/* <MyTag {...dateInfo} /> */}
		</VStack>
	);
};
