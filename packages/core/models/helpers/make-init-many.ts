type InitFn<A, B, Args extends any[]> = (value: A, ...args: Args) => B;

export const makeWithInitMany = <A, B, Args extends any[]>(init: InitFn<A, B, Args>) => {
	return {
		init: {
			one: init,
			many: (values: readonly A[], ...args: Args): readonly B[] => {
				return values.map((value) => init(value, ...args));
			},
		},
	};
};
