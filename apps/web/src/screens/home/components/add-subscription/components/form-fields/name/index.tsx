import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import { useSubscriptionCreateFormField as useField } from '../../form';
import { FloatingTextInput } from '@angel-oak/ui/form/floating-text-input';

export const NameField = () => {
	const { field, meta } = useField('name');
	const invalid = meta.error && meta.touched;

	return (
		<FormControl variant="floating" id="first-name" isInvalid={!!invalid}>
			<FloatingTextInput
				{...field}
				id="name"
				placeholder="Light"
				label={'Name'}
				error={meta.error}
				mt={'0'}
			/>
		</FormControl>
	);
};
