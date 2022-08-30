import { getFirestore } from 'firebase/firestore';
import { BillSubscription } from '../../../models/use-cases/bill-subscription';
import { FirestoreRepo } from '../../helpers/firebase';
import { LoadBillSubscriptionRepo } from './load';
import { IBillSubscriptionCreatePayload, IBillSubscriptionListPayload } from './types';

const firebaseRepo = new FirestoreRepo(
	getFirestore(),
	'bill_subscriptions',
	BillSubscription.init.one
);
export const BillSubscriptionRepo = new LoadBillSubscriptionRepo(firebaseRepo);

export declare namespace BillSubscriptionRepo {
	export type Create = IBillSubscriptionCreatePayload;
	export type List = IBillSubscriptionListPayload;
}
