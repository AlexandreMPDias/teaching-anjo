// 1. Import the extendTheme function
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../assets/theme';

export const StyleProvider: React.FC = ({ children }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
