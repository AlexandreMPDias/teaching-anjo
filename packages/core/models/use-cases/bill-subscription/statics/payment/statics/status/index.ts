import { makeEnum } from '@angel-oak/utils/array/make-enum';
import { composeAnySelector } from '@angel-oak/utils/selector-composer';
import { IBillSubscriptionPayment } from '../../schema';

type PaymentStatus = IBillSubscriptionPayment.Status;

export const PaymentStatus = {
	composeSelector: composeAnySelector<PaymentStatus>(),
	OPTIONS: makeEnum<PaymentStatus>()('overdue', 'paid', 'pending'),
};
