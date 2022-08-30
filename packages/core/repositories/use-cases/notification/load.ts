import { v4 as uuid } from 'uuid';
import { INotification as Model } from '../../../models/schemas';
import { Notification } from '../../../models/use-cases/notification';
import { FirestoreRepo } from '../../helpers/firebase';
import { FirestoreCollectionRepo } from '../../helpers/firebase/collection-repo';
import { docSet } from '../../helpers/firebase/document-repo';

import { INotificationCreatePayload as Create, INotificationListPayload } from './types';

export class LoadNotificationRepo {
	constructor(private readonly repo: FirestoreRepo<Model, Model.Api>) {}

	public async list(filter: INotificationListPayload): Promise<readonly Model[]> {
		const collection = this.getCollection();
		const query = collection.queryBuilder();
		if (filter.billSubscriptionUuid) {
			query.with('billSubscriptionUuid', '==', filter.billSubscriptionUuid);
		}
		if (filter.day !== undefined) query.with('date.day', '==', filter.day);
		if (filter.month !== undefined) query.with('date.month', '==', filter.month);
		if (filter.year !== undefined) query.with('date.year', '==', filter.year);

		const snapshot = await query.orderBy('date', 'asc').get();

		return snapshot.docs.map((doc) => doc.data({ serverTimestamps: 'estimate' }));
	}

	public create(payload: Create) {
		const doc = this.getCollection().doc(uuid());

		const data: Model.Create = {
			...payload,
		};

		return docSet(doc, Notification.create(data), {
			createdAt: true,
		});
	}

	private getCollection(): FirestoreCollectionRepo<Model, Model.Api> {
		return this.repo.collect();
	}
}
