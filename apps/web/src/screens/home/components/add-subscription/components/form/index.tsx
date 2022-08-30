import { FormControl } from '@chakra-ui/react';
import { Formik } from 'formik';
import { DateService } from '@angel-oak/utils/date';
import validation from './validation';
import { FormValues, ISubscriptionCreateFormProps } from './types';

export * from './helpers';
export * from './types';

export const SubscriptionCreateForm: React.FC<ISubscriptionCreateFormProps> = (props) => {
	return (
		<FormControl as="fieldset" variant="floating">
			<Formik<FormValues>
				initialValues={{
					name: '',
					start: DateService.format.date.db(DateService.today()),
					end: '',
					frequency: 'monthly',
					tags: [],
					rules: [],
				}}
				validationSchema={validation}
				onSubmit={(values) => {
					const start = DateService.parse(values.start);
					if (!start) throw new Error('Invalid start date: ' + values.start);
					return props.onSubmit({
						...values,
						start: start,
						end: values.end ? DateService.parse(values.end) : undefined,
					});
				}}
				validateOnBlur
			>
				{props.children}
			</Formik>
		</FormControl>
	);
};
