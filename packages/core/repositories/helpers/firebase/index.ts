import { Firestore, collection, serverTimestamp, increment } from 'firebase/firestore';
import { FirestoreCollectionRepo } from './collection-repo';

export class FirestoreRepo<Front, Api = any, Args extends any[] = []> {
	constructor(
		private readonly firestore: Firestore,
		private readonly pathPrefix: string | ((...args: Args) => string),
		private readonly parser: (value: Api) => Front
	) {}

	public collect = (...args: Args): FirestoreCollectionRepo<Front, Api> => {
		const path =
			typeof this.pathPrefix === 'string' ? this.pathPrefix : this.pathPrefix(...args);
		const firestoreCollection = collection(this.firestore, path);
		return new FirestoreCollectionRepo<Front>(firestoreCollection, this.parser);
	};

	public field = {
		increment: (): any => increment(1),
		timestamp: (): any => serverTimestamp(),
	};
}
