import { makeTypography } from './make-typo';
import { Hightlight } from './highlight';

export const Typo = {
	H1: makeTypography({ name: 'H1', tag: 'h1' }),
	H2: makeTypography({ name: 'H2', tag: 'h2' }),
	H3: makeTypography({ name: 'H3', tag: 'h3' }),
	Title: makeTypography({ name: 'Title', tag: 'p' }),
	Paragraph: makeTypography({
		name: 'Paragraph',
		tag: 'p',
		boldStyle: {
			fontFamily: 'demiBold',
			color: 'primary.400',
		},
	}),
	Small: makeTypography({
		name: 'Small',
		tag: 'small',
		defaultColor: 'gray.500',
	}),
	Hightlight,
};

export const ReallyLongSpecificNameForTypo = Typo;
