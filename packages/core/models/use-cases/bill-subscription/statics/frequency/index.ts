import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { makeEnum } from '@angel-oak/utils/array/make-enum';
import { composeAnySelector } from '@angel-oak/utils/selector-composer';
import getDateInfo from './frequency-date-info';

export const Frequency = {
	getDateInfo,
	composeSelector: composeAnySelector<IBillSubscription.Frequency>(),
	OPTIONS: makeEnum<IBillSubscription.Frequency>()('aperiodic', 'monthly', 'weekly', 'yearly'),
};
