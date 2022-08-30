import { getFirestore } from 'firebase/firestore';
import { Notification } from '../../../models/use-cases/notification';
import { FirestoreRepo } from '../../helpers/firebase';
import { LoadNotificationRepo } from './load';
import { INotificationCreatePayload, INotificationListPayload } from './types';

const firebaseRepo = new FirestoreRepo(getFirestore(), 'notifications', Notification.init);
export const NotificationRepo = new LoadNotificationRepo(firebaseRepo);

export declare namespace NotificationRepo {
	export type Create = INotificationCreatePayload;
	export type List = INotificationListPayload;
}
