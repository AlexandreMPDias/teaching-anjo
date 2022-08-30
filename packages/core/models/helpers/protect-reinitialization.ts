export const makeProtectedInit =
	<D>() =>
	<I = any>(checker: (input: I | D) => boolean) => {
		const protect = <Input extends I>(init: (input: Input) => D) => {
			return (input: Input | D): D => {
				return checker(input) ? input : (init(input as any) as any);
			};
		};

		return { protect };
	};
