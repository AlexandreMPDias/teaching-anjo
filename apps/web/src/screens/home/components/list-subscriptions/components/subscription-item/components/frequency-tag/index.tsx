import { useMemo } from 'react';
import { Tag } from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { DateService } from '@angel-oak/utils/date';
import { capitalize } from '@angel-oak/utils/string/format';

export const FrequencyTag: React.FC<{ subscription: IBillSubscription }> = ({ subscription }) => {
	const frequencySelector = BillSubscription.Frequency.composeSelector(subscription.frequency);

	const style = frequencySelector({
		aperiodic: {
			color: 'white',
			bg: 'primary.400',
		},
		weekly: {
			color: 'white',
			bg: 'green',
		},
		monthly: {
			color: 'white',
			bg: 'teal.500',
		},
		yearly: {
			color: 'white',
			bg: 'tomato',
		},
	});

	const periodicity = useMemo(() => {
		const { start } = subscription;
		return frequencySelector<() => string>({
			aperiodic: () => {
				return `At: ${DateService.format.date.db(start)}`;
			},
			weekly: () => {
				return `Every ${capitalize(DateService.format.weekday(start))}`;
			},
			monthly: () => {
				const day = start.getDate();
				const suffixes = ['st', 'nd', 'rd', 'th'];
				const suffix = suffixes[day] ?? suffixes[suffixes.length - 1];

				return `On the ${day}${suffix}`;
			},
			yearly: () => {
				return `On ${DateService.format.month(start)}`;
			},
		})();
	}, [subscription]);

	return (
		<>
			<Tag {...style} userSelect="none">
				{subscription.frequency}
			</Tag>
			<Tag userSelect="none" color="white" bg="brown">
				{periodicity}
			</Tag>
		</>
	);
};
