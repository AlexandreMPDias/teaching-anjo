import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { useMemo } from 'react';
import { TagData, TagStyle } from './types';

const frequencySelector = BillSubscription.Frequency.composeSelector()<TagStyle>({
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

export const useFrequencyLabelTag = ({ frequency }: IBillSubscription): TagData => {
	return useMemo(
		() => ({
			...frequencySelector(frequency),
			label: frequency,
		}),
		[frequency]
	);
};
