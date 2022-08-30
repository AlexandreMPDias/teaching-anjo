import { FormValues } from './types';
import { useField } from 'formik';

export const useSubscriptionCreateFormField = <K extends keyof FormValues>(key: K) => {
	const [field, meta, helpers] = useField<FormValues[K]>(key);
	return { field, meta, helpers };
};
