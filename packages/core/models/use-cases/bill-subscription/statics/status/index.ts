import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { makeEnum } from '@angel-oak/utils/array/make-enum';
import { composeAnySelector } from '@angel-oak/utils/selector-composer';

export const Status = {
	composeSelector: composeAnySelector<IBillSubscription.Status>(),
	OPTIONS: makeEnum<IBillSubscription.Status>()('active', 'inactive'),
};
