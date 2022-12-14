import { Box } from '@chakra-ui/react';
import { Header } from '../header';

export const Page: React.FC = (props) => {
	return (
		<Box id="page" w="100%" overflowY={'hidden'}>
			<Header />
			{props.children}
		</Box>
	);
};
