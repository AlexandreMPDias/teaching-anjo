import { FloatingTextInput } from '@angel-oak/ui/form/floating-text-input';

type Props = Pick<
	FloatingTextInput.Props,
	'value' | 'name' | 'multiple' | 'checked' | 'onChange' | 'onBlur'
> & {
	error?: string;
};

export const DateTextField: React.FC<Props> = (field) => {
	return (
		<FloatingTextInput
			id={'start'}
			{...field}
			type="date"
			label={'date'}
			error={field.error}
			placeholder="dd/mm/yyyy"
		/>
	);
};
