import * as Yup from 'yup';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';
import { StringList } from '@angel-oak/utils/string/list';
import { IBillSubscription } from '@angel-oak/core/models/schemas';

const readableOptions = BillSubscription.Frequency.OPTIONS as IBillSubscription.Frequency[];

const validation = Yup.object().shape({
	name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
	frequency: Yup.string()
		.required('Frequency is required')
		.is(readableOptions, `Frequency must be either: ${StringList.anyOf(readableOptions)}`),
	start: Yup.string(),
	end: Yup.string(),
});

export default validation;
