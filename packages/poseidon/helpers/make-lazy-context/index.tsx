import React, { createContext, useContext as ReactUseContext } from 'react';

const makeContextProvider = <D, P = {}>(
	useInitialValuesHook: (props: P) => D,
	Context: any
): React.FC<P> => {
	const ContextComponent: React.FC<P> = (props) => {
		const value = useInitialValuesHook(props);

		return <Context.Provider value={value}>{props.children}</Context.Provider>;
	};
	return ContextComponent;
};

type IProvider<I> = {
	<P extends I = I>(Parent: React.FC<P & I>): React.FC<P>;
};

export const makeWrapContextProvider = <D extends any, P = {}>(
	Provider: React.FC<P>
): IProvider<P> => {
	const wrapWithProvider = <Props extends P = P>(
		Parent: React.FC<Props>
	): React.FC<Props & P> => {
		const ContextComponent = (props: Props & P) => {
			return (
				<Provider {...props}>
					<Parent {...props} />
				</Provider>
			);
		};
		return ContextComponent;
	};
	return wrapWithProvider;
};

type EmptyArray<Arr extends any[]> = Arr extends [] ? {} : Arr[0];

export const makeLazyContext = <H extends (props?: any) => any>(useHook: H) => {
	type D = ReturnType<H>;
	type P = EmptyArray<Parameters<H>>;

	const Context = createContext<D>({} as any);
	const Provider = makeContextProvider<D, P>(useHook, Context);

	return {
		Context,
		useContext: (): D => ReactUseContext(Context),
		withProvider: makeWrapContextProvider<D, P>(Provider),
		Provider,
	};
};
