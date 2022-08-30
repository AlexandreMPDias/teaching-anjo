import {
	CollectionReference,
	QuerySnapshot,
	FieldPath,
	Query,
	QueryConstraint,
	query,
	getDocs,
	where,
	WhereFilterOp,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';

type Primitive<V> = V extends string | number | boolean | Date
	? V
	: V extends Array<infer L>
	? L
	: never;

export class FirebaseRepoQueryBuilder<T> {
	private readonly constraints: QueryConstraint[] = [];

	constructor(private readonly collection: CollectionReference<T>) {}

	public with = <K extends string | FieldPath>(
		field: K,
		op: WhereFilterOp,
		value: K extends keyof T ? Primitive<T[K]> : unknown
	) => {
		this.constraints.push(where(field, op, value));
		return this;
	};

	public orderBy = (field: string, direction: 'asc' | 'desc') => {
		this.constraints.push(orderBy(field, direction));
		return this;
	};

	public get = (): Promise<QuerySnapshot<T>> => {
		return getDocs(this.query());
	};

	public onSnapshot = (callback: (snapshot: QuerySnapshot<T>) => void) => {
		return onSnapshot(this.query(), callback);
	};

	private query = (): Query<T> => {
		return query(this.collection, ...this.constraints);
	};
}
