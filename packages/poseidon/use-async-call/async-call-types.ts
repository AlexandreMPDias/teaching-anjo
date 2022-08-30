import { AsyncCallbackRet } from './helpers/types';

export type AsyncCallback<A extends any[], R = Promise<void>> = {
	(...args: A): AsyncCallbackRet<R>;
	running: boolean;
};

export interface AsyncCallbackOptions<A extends any[], R = Promise<void>> {
	/**
	 * Indicates if the function should be executed or not
	 * Can be a function that receives the arguments and returns a boolean
	 * Or a boolean
	 *
	 * @default {true}
	 */
	enabled?: boolean | ((...args: A) => boolean);

	/**
	 * Handles errors thrown by the function
	 *
	 * @param error The error thrown by the function
	 * @param args The arguments passed to the function
	 */
	onError?(error: Error, ...args: A): void;

	/**
	 * Initial loading state
	 */
	initial?: boolean;
}
