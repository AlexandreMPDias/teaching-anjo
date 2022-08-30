import { colors } from '../colors';

export const scrollbarStyle = {
	'&::-webkit-scrollbar': {
		height: '12px',
	},
	'&::-webkit-scrollbar-track': {
		background: colors.keys.neutral_200,
	},
	'&::-webkit-scrollbar-thumb': {
		background: colors.keys.neutral_400,
		borderRadius: '12px',
	},
};
