import { FormControl } from '@chakra-ui/react';
import { FloatingTextInput } from '@angel-oak/ui/form/floating-text-input';
import { useSubscriptionCreateFormField as useField } from '../../form';

export const EndDateField: React.FC = () => {
	const { field, meta } = useField('end');
	const invalid = meta.error && meta.touched;

	const frequencyField = useField('frequency');

	if (frequencyField.field.value === 'aperiodic') return null;

	return (
		<FormControl variant="floating" isInvalid={!!invalid} mt="28px">
			<FloatingTextInput
				id={'end'}
				{...field}
				type="date"
				label={'end date'}
				error={meta.error}
				placeholder="dd/mm/yyyy"
			/>
		</FormControl>
	);
};
