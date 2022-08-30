import { useMemo } from 'react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { TagData } from './types';

export const useSubscriptionFrequencyDateInfo = (subscription: IBillSubscription): TagData => {
	return useMemo(
		() => ({
			label: BillSubscription.Frequency.getDateInfo(subscription),
			color: 'white',
			bg: 'brown',
		}),
		[subscription.start, subscription.frequency]
	);
};
