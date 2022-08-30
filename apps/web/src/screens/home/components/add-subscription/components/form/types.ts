import { FormikProps } from 'formik';
import { BillSubscriptionRepo as Repo } from '@angel-oak/core/repositories/use-cases/bill-subscription';
import { NotificationRuleRepo } from '@angel-oak/core/repositories/use-cases/notification-rule';

export type FormValues = Omit<Repo.Create, 'start' | 'end'> & {
	start: string;
	end: string;
	rules: NotificationRuleRepo.Create[];
};

export interface ISubscriptionCreateFormProps {
	onSubmit(values: Repo.Create): void;
	children: (props: FormikProps<FormValues>) => React.ReactNode;
}
