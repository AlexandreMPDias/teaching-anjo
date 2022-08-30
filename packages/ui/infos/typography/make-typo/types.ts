import { FlexProps, TextProps } from '@chakra-ui/react';

export type TypographyProps = Omit<TextProps, 'fontFamily'> & {
	icon?: JSX.Element;
	container?: FlexProps;
	children: React.ReactNode;
	ref?: any;
};
