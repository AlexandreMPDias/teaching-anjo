import { colors } from '@angel-oak/ui/assets/colors';
import { Box, useRadio, RadioProps, Center } from '@chakra-ui/react';

const makeStyle = (fore: colors.Key, back: colors.Key) => ({
	color: fore,
	bg: back,
	borderColor: fore,
});

export const RadioSelectOptionCard: React.FC<RadioProps> = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
			<input {...input} />
			<Center
				{...checkbox}
				{...makeStyle('secondary.400', 'white')}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				_checked={{ ...makeStyle('white', 'secondary.700'), borderColor: 'secondary.700' }}
				_focus={{}}
				px={3}
				py={2}
				textTransform="capitalize"
			>
				{props.children}
			</Center>
		</Box>
	);
};
