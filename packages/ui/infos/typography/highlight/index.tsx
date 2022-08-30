import { Text, forwardRef } from '@chakra-ui/react';
import { TextProps } from '@chakra-ui/react';
import { Fonts } from '../../../assets/fonts';

export type HighlightProps = Omit<TextProps, 'fontFamily'> & {
	fontFamily?: Fonts;
	children: React.ReactNode;
};

export const Hightlight: React.FC<HighlightProps> = forwardRef((props, ref) => {
	return <Text {...props} as="b" ref={ref} fontFamily={Fonts.get(props.fontFamily)} />;
});
