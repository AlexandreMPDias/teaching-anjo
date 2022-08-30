import {
	CollectionReference,
	serverTimestamp,
	DocumentReference,
	addDoc,
	doc,
	getDoc,
	DocumentSnapshot,
	updateDoc,
	WithFieldValue,
} from 'firebase/firestore';

const prepareValue = <K>(value: WithFieldValue<K>, options?: FirestoreDocumentRepo.SetOptions) => {
	if (value && options?.updatedAt) {
		Object.assign(value, { updatedAt: serverTimestamp() });
	}
	if (value && options?.createdAt) {
		Object.assign(value, { createdAt: serverTimestamp() });
	}
	return value;
};

export async function docSet<Front, Api = any>(
	repo: FirestoreDocumentRepo<Front, Api>,
	value: WithFieldValue<any>,
	options?: FirestoreDocumentRepo.SetOptions
) {
	try {
		const next = prepareValue(value, options);
		await addDoc(repo.collection, next);
	} catch (err) {
		console.error(`FirestoreDocumentRepo.set - ${repo.id} - ${repo.collection.path}`);
		console.error(err);
	}
}

export async function docUpdate<Front, Api = any>(
	repo: FirestoreDocumentRepo<Front, Api>,
	value: WithFieldValue<any>,
	options?: Omit<FirestoreDocumentRepo.SetOptions, 'createdAt'>
) {
	try {
		const next = prepareValue(value, options);
		await updateDoc(repo.doc, next);
	} catch (err) {
		console.error(`FirestoreDocumentRepo.set - ${repo.id} - ${repo.collection.path}`);
		console.error(err);
	}
}

export class FirestoreDocumentRepo<Front, Api = any> {
	public readonly doc: DocumentReference<Front>;

	constructor(
		public readonly collection: CollectionReference<Front>,
		public readonly id: string
	) {
		this.doc = doc(this.collection, id);
	}

	public get = (): Promise<DocumentSnapshot<Front>> => {
		return getDoc(this.doc);
	};

	public set = async <K = Api>(
		value: WithFieldValue<K>,
		options?: FirestoreDocumentRepo.SetOptions
	): Promise<void> => {
		try {
			const next = this.prepareValue(value, options);
			await addDoc(this.collection, next as any);
		} catch (err) {
			console.log('errr', err);
			console.error(`FirestoreDocumentRepo.set - ${this.id} - ${this.collection.path}`);
			console.error(err);
		}
	};

	public update = async <K>(
		value: WithFieldValue<K>,
		options?: FirestoreDocumentRepo.SetOptions
	): Promise<void> => {
		try {
			const next = this.prepareValue(value, options);
			await updateDoc(this.doc, next as any);
		} catch (err) {
			console.error(`FirestoreDocumentRepo.update - ${this.id} - ${this.collection.path}`);
			console.error(err);
		}
	};

	private prepareValue = <K>(
		value: WithFieldValue<K>,
		options?: FirestoreDocumentRepo.SetOptions
	) => {
		if (value && options?.updatedAt) {
			Object.assign(value, { updatedAt: serverTimestamp() });
		}
		if (value && options?.createdAt) {
			Object.assign(value, { createdAt: serverTimestamp() });
		}
		return value;
	};
}

export declare namespace FirestoreDocumentRepo {
	export interface UpdateOptions {
		updatedAt?: boolean;
	}
	export interface SetOptions extends UpdateOptions {
		createdAt?: boolean;
	}
}
