import { AsyncCallbackModel, AsyncCallbackParams } from '../types';

const parseAsyncCallbackParameters = <A extends any[], R>(
	...args: AsyncCallbackParams<A, R>
): AsyncCallbackModel<A, R> => {
	if (args.length === 3) {
		const [callback, options, deps] = args;
		return { callback, options, deps };
	}

	const [callback, deps] = args;
	return { callback, options: {}, deps };
};
export default parseAsyncCallbackParameters;
