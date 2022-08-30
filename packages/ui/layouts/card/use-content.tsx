import { CardProps } from './use-cases/basic';
import { AnyContent } from '../content';

export default (props: CardProps & { children?: any }) => {
	const { children, loading, error } = props;

	return (
		<AnyContent loading={loading} error={error}>
			{children}
		</AnyContent>
	);
};
