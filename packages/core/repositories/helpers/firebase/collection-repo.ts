import { CollectionReference } from 'firebase/firestore';
import { FirestoreDocumentRepo } from './document-repo';
import { FirebaseRepoQueryBuilder } from './query-builder';

export class FirestoreCollectionRepo<Front, Api = any> {
	private readonly collection: CollectionReference<Front>;
	constructor(collection: CollectionReference, parser: (value: Api) => Front) {
		this.collection = collection.withConverter({
			toFirestore: (value: Front) => value,
			fromFirestore: (snapshot: any) => parser(snapshot.data()),
		});
	}

	public collect = (): CollectionReference<Front> => {
		return this.collection;
	};

	public doc = (uuid: string): FirestoreDocumentRepo<Front, Api> => {
		return new FirestoreDocumentRepo<Front>(this.collection, uuid);
	};

	public queryBuilder = (): FirebaseRepoQueryBuilder<Front> => {
		return new FirebaseRepoQueryBuilder(this.collection);
	};
}
