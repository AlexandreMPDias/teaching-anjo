import { ComponentSingleStyleConfig } from '@chakra-ui/theme';
import { colors } from '../../../../colors';

const cardStyleConfig: ComponentSingleStyleConfig = {
	// The styles all Cards have in common
	baseStyle: {
		display: 'flex',
		flexDirection: 'column',
		background: colors.get('background.header'),
		alignItems: 'center',
	},
	// Two variants: rounded and smooth
	variants: {
		rounded: {
			borderRadius: 'xl',
			boxShadow: 'xl',
		},
		smooth: {
			borderRadius: 'base',
			boxShadow: 'md',
		},
	},
	// The default variant value
	defaultProps: {
		variant: 'smooth',
	},
};

export default cardStyleConfig;
