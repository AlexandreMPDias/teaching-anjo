import { Grid } from '@chakra-ui/react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { RadioSingleSelect } from '@angel-oak/ui/form/radio-single-select';
import { useSubscriptionCreateFormField as useField } from '../../form';

const FREQUENCY_OPTIONS: IBillSubscription.Frequency[] = [
	'monthly',
	'weekly',
	'yearly',
	'aperiodic',
];

const ItemsGridContainer: React.FC = ({ children }) => {
	return (
		<Grid gap="12px" gridTemplateColumns={'1fr 1fr'}>
			{children}
		</Grid>
	);
};

export const FrequencyField = () => {
	const { field, meta, helpers } = useField('frequency');
	const invalid = meta.error && meta.touched;

	return (
		<RadioSingleSelect
			isInvalid={invalid}
			label="Select Frequency"
			options={FREQUENCY_OPTIONS}
			defaultValue={'monthly'}
			onChangeValue={helpers.setValue}
			{...field}
			ItemsContainer={ItemsGridContainer}
		/>
	);
};
