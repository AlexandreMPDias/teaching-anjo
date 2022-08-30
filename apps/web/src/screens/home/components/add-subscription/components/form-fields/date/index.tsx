import { FormControl, FormControlProps, FormHelperText } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSubscriptionCreateFormField as useField } from '../../form';
import { makeFrequencySelector } from './helpers/frequency-selector';
import { DateSlider } from './components/date-slider';
import { DateService } from '@angel-oak/utils/date';
import { DateTextField } from './components/text-input';
import { Datum } from '@angel-oak/utils/date/datum';

// Hook
function usePrevious<V>(value: V) {
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const ref = useRef<V>();
	// Store current value in ref
	useEffect(() => {
		(ref.current as any) = value;
	}, [value]); // Only re-run if value changes
	// Return previous value (happens before update in useEffect above)
	return ref.current;
}

export const DateField: React.FC<{ field: 'start' | 'end' }> = (props) => {
	// console.log('\n'.repeat(2));

	const { field, meta, helpers } = useField(props.field);
	const invalid = meta.error && meta.touched;

	const frequency = useField('frequency');
	const frequencySelector = makeFrequencySelector(frequency.field.value);

	const parsedField = useMemo(() => {
		return DateService.parse(field.value);
	}, [field.value]);
	const dateValue = useMemo(() => {
		return parsedField ?? DateService.today();
	}, [field.value]);

	const Container: React.FC<FormControlProps> = useCallback(
		(containerProps) => {
			return <FormControl isInvalid={!!invalid} {...containerProps} />;
		},
		[invalid]
	);

	const Content = frequencySelector({
		weekly: DateSlider.Weekly,
		monthly: DateSlider.Monthly,
		yearly: DateSlider.Yearly,
	});

	if (Content === null) {
		return (
			<Container variant="floating">
				<DateTextField {...field} error={meta.error} />
			</Container>
		);
	}

	return (
		<Container>
			<Content
				value={dateValue}
				onChange={(value: Datum) => {
					helpers.setValue(DateService.format.date.db(value));
				}}
			/>
			{field.value && (
				<FormHelperText>
					Date: {DateService.format.date.human(field.value)} -{' '}
					{DateService.format.weekday(dateValue)}
				</FormHelperText>
			)}
		</Container>
	);
};
