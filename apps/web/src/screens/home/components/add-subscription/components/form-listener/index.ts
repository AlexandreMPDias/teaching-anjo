import { FormikContextType, useFormikContext } from 'formik';
import { NotificationRule } from '@angel-oak/core/models/use-cases/notification-rule';
import { useEffect } from 'react';
import { FormValues } from '../form/types';

const resetField = (field: keyof FormValues) => (form: FormikContextType<FormValues>) => {
	form.setFieldValue(field, form.initialValues[field]);
	form.setFieldTouched(field, false);
};

const useFieldEffect = (
	trigger: keyof FormValues,
	callback: (form: FormikContextType<FormValues>) => void
) => {
	const form = useFormikContext<FormValues>();
	useEffect(() => {
		callback(form);
	}, [form.values[trigger]]);
};

export const SubscriptionFormListener: React.FC = () => {
	useFieldEffect('start', resetField('end'));
	useFieldEffect('frequency', ({ values, setFieldValue }) => {
		if (!values.frequency || !values.rules.length) return;
		setFieldValue('rules', NotificationRule.getDefaultRules({ frequency: values.frequency }));
	});

	return null;
};
