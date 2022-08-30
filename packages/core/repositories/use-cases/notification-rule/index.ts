import { getFirestore } from 'firebase/firestore';
import { IBillSubscription } from '../../../models/schemas';
import { NotificationRule } from '../../../models/use-cases/notification-rule';
import { FirestoreRepo } from '../../helpers/firebase';
import { LoadNotificationRuleRepo } from './load';
import { INotificationCreatePayload } from './types';

const firebaseRepo = new FirestoreRepo(
	getFirestore(),
	(subscription: IBillSubscription) => {
		return `bill_subscriptions/${subscription.uuid}/notification_rules`;
	},
	NotificationRule.init.one
);
export const NotificationRuleRepo = new LoadNotificationRuleRepo(firebaseRepo);

export declare namespace NotificationRuleRepo {
	export type Create = INotificationCreatePayload;
}
