import { Flex } from '@chakra-ui/react';
import { Header } from '../header';

export const Page: React.FC = (props) => {
	return (
		<Flex id="page" w="100%" h="100%" maxH="100%" flexDir={'column'}>
			<Header />
			{props.children}
		</Flex>
	);
};
