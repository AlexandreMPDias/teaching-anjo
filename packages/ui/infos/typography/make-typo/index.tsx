import {
	Text,
	forwardRef,
	Heading,
	Flex,
	useMultiStyleConfig,
	HeadingProps,
} from '@chakra-ui/react';
import { colors } from '../../../assets/colors';
import { Fonts } from '../../../assets/fonts';
import { addDefaultProps } from '../../../helpers/add-default-props';
import { TypographyProps } from './types';

interface TypographyModel {
	name: string;
	defaultColor?: colors.Key | string;
	boldStyle?: Omit<TypographyProps & { fontFamily?: Fonts }, 'children'>;
	tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small';
}

export const makeTypography = (model: TypographyModel) => {
	const { name, boldStyle, defaultColor } = model;
	const isHeading = name.match(/^H\d+$/i);
	const ContainerComponent: React.FC<HeadingProps & { ref?: any }> = isHeading
		? (Heading as any)
		: (Text as any);

	const Container: React.FC<TypographyProps> = forwardRef((props, ref) => {
		return (
			<ContainerComponent
				{...props}
				ref={ref}
				sx={{
					...props.sx,
					b: boldStyle || {},
				}}
			/>
		);
	});

	const Component: React.FC<TypographyProps> = forwardRef((props: TypographyProps, ref) => {
		const styles = useMultiStyleConfig(name, props);

		if (props.icon) {
			const { container, icon, color, ...textProps } = props;
			return (
				<Flex sx={styles.container} {...container} color={color}>
					{props.icon}
					<Container sx={styles.text} {...textProps} ref={ref} />
				</Flex>
			);
		}

		return <Container ref={ref} sx={styles.text} {...props} />;
	});

	return addDefaultProps(Component, {
		color: defaultColor || 'secondary.100',
		as: model.tag,
	});
};
