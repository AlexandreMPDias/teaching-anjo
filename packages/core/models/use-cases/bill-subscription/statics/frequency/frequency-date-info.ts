import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { DateService } from '@angel-oak/utils/date';
import { composeAnySelector } from '@angel-oak/utils/selector-composer';
import { capitalize } from '@angel-oak/utils/string/format';

const selector = composeAnySelector<IBillSubscription.Frequency>()();

type Input = Pick<IBillSubscription, 'start' | 'frequency'>;

const frequencyDateInfoSelector = selector<(subscription: Pick<Input, 'start'>) => string>({
	aperiodic: ({ start }) => {
		return `At: ${DateService.format.date.human(start)}`;
	},
	weekly: ({ start }) => {
		return `Every ${capitalize(DateService.format.weekday(start))}`;
	},
	monthly: ({ start }) => {
		const day = start.getDate();
		const suffixes = ['st', 'nd', 'rd', 'th'];
		const suffix = suffixes[day] ?? suffixes[suffixes.length - 1];

		return `On every ${day}${suffix} day`;
	},
	yearly: ({ start }) => {
		return `On ${DateService.format.month(start)}`;
	},
});

export default (subscription: Input): string =>
	frequencyDateInfoSelector(subscription.frequency)(subscription);
