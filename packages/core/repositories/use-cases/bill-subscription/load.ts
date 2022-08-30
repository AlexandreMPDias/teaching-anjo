import { IBillSubscription as Model } from '../../../models/schemas';
import { BillSubscription } from '../../../models/use-cases/bill-subscription';
import { FirestoreRepo } from '../../helpers/firebase';
import { FirestoreCollectionRepo } from '../../helpers/firebase/collection-repo';
import { docSet, docUpdate } from '../../helpers/firebase/document-repo';

import {
	IBillSubscriptionCreatePayload as Create,
	IBillSubscriptionListPayload,
	IBillSubscriptionUpdatetPayload as Update,
} from './types';

export class LoadBillSubscriptionRepo {
	constructor(private readonly repo: FirestoreRepo<Model, Model.Api>) {}

	public async list(filter?: IBillSubscriptionListPayload): Promise<readonly Model[]> {
		const collection = this.getCollection();
		const query = collection.queryBuilder();

		const snapshot = await query.orderBy('name', 'asc').get();

		return snapshot.docs.map((doc) => doc.data({ serverTimestamps: 'estimate' }));
	}

	public create(payload: Create) {
		const doc = this.getCollection().doc(payload.name);

		const data: Model.Create = {
			...payload,
			id: this.repo.field.increment(),
			uuid: doc.id,
		};

		return docSet(doc, BillSubscription.create(data), {
			updatedAt: true,
			createdAt: true,
		});
	}

	public update(uuid: string, payload: Update) {
		const doc = this.getCollection().doc(uuid);

		return docUpdate(doc, payload, { updatedAt: true });
	}

	private getCollection(): FirestoreCollectionRepo<Model, Model.Api> {
		return this.repo.collect();
	}
}
