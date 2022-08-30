import { IBill, IBillSubscription } from '../../../models/schemas';
import { Bill } from '../../../models/use-cases/bill';
import { FirestoreRepo } from '../../helpers/firebase';
import { IBillCreatePayload, IBillUpdatetPayload } from './types';
import { docSet, docUpdate } from '../../helpers/firebase/document-repo';
import { onSnapshot, DocumentSnapshot } from 'firebase/firestore';

export class LoadBillRepo {
	constructor(private readonly repo: FirestoreRepo<IBill, IBill.Api>) {}

	public list = async (): Promise<readonly IBill[]> => {
		const collection = this.getCollection();
		const query = collection.queryBuilder();

		const snapshot = await query.get();

		return snapshot.docs.map((doc) => doc.data({ serverTimestamps: 'estimate' }));
	};

	public get = async (uuid: string): Promise<IBill | null> => {
		const collection = this.getCollection();

		const doc = collection.doc(uuid);

		const docSnapshot = await doc.get();

		if (!docSnapshot.exists) return null;
		return docSnapshot.data({ serverTimestamps: 'estimate' }) ?? null;
	};

	public listen = (uuid: string, onBillSnapshot: (snapshot: DocumentSnapshot<IBill>) => void) => {
		const collection = this.getCollection();
		const doc = collection.doc(uuid);
		return onSnapshot(doc.doc, onBillSnapshot);
	};

	public create = (subscription: IBillSubscription, payload: IBillCreatePayload) => {
		const doc = this.getCollection().doc('');

		const data: IBill.Create = {
			...payload,
			id: this.repo.field.increment(),
			uuid: '',
			subscription: subscription.uuid,
		};

		return docSet(doc, Bill.create(data), {
			updatedAt: true,
			createdAt: true,
		});
	};

	public update(uuid: string, payload: IBillUpdatetPayload) {
		const doc = this.getCollection().doc(uuid);
		return docUpdate(doc, payload, { updatedAt: true });
	}

	public updateStatus = (bill: IBill, status: IBill.Status) => {
		const doc = this.getCollection().doc(bill.uuid);

		return doc.update({ status }, { updatedAt: true });
	};

	private getCollection = () => this.repo.collect();
}
