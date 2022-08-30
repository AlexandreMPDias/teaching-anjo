import { AsyncCallbackOptions } from '../async-call-types';

export * from '../async-call-types';

export type AsyncCallbackRet<R> = Promise<Awaited<R | null>>;

export type AsyncCallbackParams<A extends any[], R> =
	| [callback: (...args: A) => R, deps: any[]]
	| [callback: (...args: A) => R, options: AsyncCallbackOptions<A, R>, deps: any[]];

export interface AsyncCallbackModel<A extends any[], R> {
	callback: (...args: A) => R;
	options: AsyncCallbackOptions<A, R>;
	deps: any[];
}
