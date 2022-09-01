import { StackProps, VStack, HStack } from '@chakra-ui/react';

export interface IScrollableProps extends StackProps {
	horizontal?: boolean;
}

export const Scrollable: React.FC<IScrollableProps> = ({ horizontal, ...props }) => {
	const Stack = horizontal ? HStack : VStack;

	return (
		<Stack
			flexGrow={1}
			justifyContent="center"
			alignItems={'center'}
			pb="10px"
			{...{ [horizontal ? 'overflowX' : 'overflowY']: 'auto' }}
			{...props}
		/>
	);
};

Scrollable.defaultProps = {};
