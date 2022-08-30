import { Center, Box, BoxProps } from '@chakra-ui/react';

const B: React.FC<BoxProps> = (props) => {
	const [prefix, intensity] = String(props.bg).split('.');
	return (
		<Center w="100px" h="50px" m="1" {...props} flexDir="column">
			<span>{prefix}</span>
			<span>{intensity}</span>
		</Center>
	);
};

export const ColorPalette: React.FC<{ primary: string; secondary: string }> = ({
	primary,
	secondary,
}) => {
	return (
		<Center flexDirection={'row'}>
			<B color={`${primary}.700`} bg={`${secondary}.100`} />
			<B color={`${primary}.400`} bg={`${secondary}.400`} />
			<B color={`${primary}.100`} bg={`${secondary}.700`} />
		</Center>
	);
};

export const PaletteTest: React.FC = () => {
	return (
		<>
			<Box>
				<ColorPalette primary="primary" secondary="secondary" />
				<ColorPalette primary="secondary" secondary="primary" />
			</Box>
			<Box my="20px">
				<ColorPalette primary="primaryX" secondary="secondaryX" />
				<ColorPalette primary="secondaryX" secondary="primaryX" />
			</Box>
		</>
	);
};
