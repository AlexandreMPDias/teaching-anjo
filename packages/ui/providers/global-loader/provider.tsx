import { GlobalLoaderComponent } from '../../layouts/global-loader';
import Context from './load';

const Wrapped: React.FC = ({ children }) => {
	const { isLoading } = Context.useContext();

	return (
		<>
			{children}
			<GlobalLoaderComponent loading={isLoading} />
		</>
	);
};

const GlobalLoaderProvider: React.FC = ({ children }) => {
	return (
		<Context.Provider>
			<Wrapped>{children}</Wrapped>
		</Context.Provider>
	);
};

export default GlobalLoaderProvider;
