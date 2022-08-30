import { v4 as uuid } from 'uuid';
import { IBillSubscription, INotificationRule as Model } from '../../../models/schemas';
import { NotificationRule } from '../../../models/use-cases/notification-rule';
import { FirestoreRepo } from '../../helpers/firebase';
import { FirestoreCollectionRepo } from '../../helpers/firebase/collection-repo';
import { docSet } from '../../helpers/firebase/document-repo';

import { INotificationCreatePayload as Create } from './types';

export class LoadNotificationRuleRepo {
	constructor(
		private readonly repo: FirestoreRepo<
			Model,
			Model.Api,
			[billSubscription: IBillSubscription]
		>
	) {}

	public async list(billSubscription: IBillSubscription): Promise<readonly Model[]> {
		const collection = this.getCollection(billSubscription);
		const query = collection.queryBuilder();
		const snapshot = await query.orderBy('date', 'asc').get();

		return snapshot.docs.map((doc) => doc.data({ serverTimestamps: 'estimate' }));
	}

	public create(billSubscription: IBillSubscription, payload: Create) {
		const doc = this.getCollection(billSubscription).doc(uuid());

		const data: Model.Create = {
			...payload,
		};

		return docSet(doc, NotificationRule.create(data), {
			createdAt: true,
		});
	}

	private getCollection(
		billSubscription: IBillSubscription
	): FirestoreCollectionRepo<Model, Model.Api> {
		return this.repo.collect(billSubscription);
	}
}
