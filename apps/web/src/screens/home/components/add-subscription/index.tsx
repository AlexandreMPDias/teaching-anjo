import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ModalProps,
} from '@chakra-ui/react';
import { Form } from 'formik';
import { SubscriptionCreateForm } from './components/form';
import { FrequencyField } from './components/form-fields/frequency';
import { NameField } from './components/form-fields/name';
import { DateField } from './components/form-fields/date';
import { useBillSubscriptionCreate } from '~/business/bill-subscription/use-create';
import { EndDateField } from './components/form-fields/end-date';
import { SubscriptionFormListener } from './components/form-listener';

export interface IAddSubscriptionModalProps extends Omit<ModalProps, 'children'> {
	onSuccess(): void;
}

export const AddSubscriptionModal: React.FC<IAddSubscriptionModalProps> = (props) => {
	const createBillSubscription = useBillSubscriptionCreate();

	return (
		<SubscriptionCreateForm
			onSubmit={(payload) =>
				createBillSubscription(payload).then(() => {
					props.onSuccess();
				})
			}
		>
			{({ isSubmitting, submitForm }) => (
				<Form>
					<Modal closeOnOverlayClick={false} isCentered {...props}>
						<ModalOverlay
							bg="blackAlpha.300"
							backdropFilter="blur(10px) hue-rotate(90deg)"
						/>
						<ModalContent>
							<SubscriptionFormListener />
							<ModalHeader color="secondary.700">{'Create Subscription'}</ModalHeader>
							<ModalCloseButton color="secondary.700" />
							<ModalBody>
								<NameField />
								<FrequencyField />
								<DateField field="start" />
								<EndDateField />
							</ModalBody>
							<ModalFooter>
								<Button
									onClick={submitForm}
									mx="auto"
									colorScheme="teal"
									isLoading={isSubmitting}
									type="submit"
								>
									Submit
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Form>
			)}
		</SubscriptionCreateForm>
	);
};
