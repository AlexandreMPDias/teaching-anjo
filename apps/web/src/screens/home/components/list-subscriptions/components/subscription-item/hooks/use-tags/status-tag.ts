import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { TagData, TagStyle } from './types';

const statusSelector = BillSubscription.Status.composeSelector()<TagStyle>({
	active: {
		color: 'white',
		bg: 'success',
	},
	inactive: {
		color: 'white',
		bg: 'gray.500',
	},
});

export const getStatusTag = ({ status }: IBillSubscription): TagData => {
	return {
		...statusSelector(status),
		label: status,
	};
};
