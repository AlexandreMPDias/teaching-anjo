import { colors } from '../../../colors';

type Out = { color: string; bg: string };

export const makeColorPair: {
	(color: colors.Key, bg: colors.Key): Out;
	(color: string, bg: colors.Key): Out;
	(color: colors.Key, bg: string): Out;
	(color: string, bg: string): Out;
} = (color: string, bg: string) => {
	return { color, bg };
};
