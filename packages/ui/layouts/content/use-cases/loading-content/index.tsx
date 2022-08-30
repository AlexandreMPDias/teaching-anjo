import { Spinner, Flex } from '@chakra-ui/react';
import { Content } from '../../content-types';

export interface ILoadingContentProps extends Content.CommonProps {
	loading: Content.Loading;
}

export default (props: ILoadingContentProps) => {
	if (!props.loading) return <>{props.children}</>;

	return (
		<Flex
			aria-busy
			m="auto"
			alignContent="center"
			justifyContent="center"
			maxW="350px"
			title="Carregando..."
		>
			<Spinner size={'xl'} />
		</Flex>
	);
};
