import { ComponentSingleStyleConfig } from '@chakra-ui/theme';
import { colors } from '../../../../colors';

const makeColor = (front: colors.Key, back: colors.Key) => {
	return { color: colors.get(front), bg: colors.get(back) };
};

const addButtonStyleConfig: ComponentSingleStyleConfig = {
	baseStyle: {
		borderRadius: '2xl',
		marginTop: 6,
		fontFamily: 'avenirBold',
		mt: '0',
		fontSize: '18px',
		pl: '20px',
		pr: '20px',
		transition: 'all 0.2s',
		_disabled: {
			cursor: 'not-allowed',
		},
	},
	variants: {
		secondary: {
			fontWeight: 'initial',
			fontFamily: 'avenirDemiBold',
			fontSize: '16px',
			...makeColor('primary.400', 'neutral.100'),
			boxShadow: 'lg',
			_hover: {
				_disabled: {
					bgColor: 'primary.100',
				},
				...makeColor('primary.400', 'primary.100'),
			},
			_disabled: makeColor('primary.100', 'neutral.100'),
		},
	},
	sizes: {
		sm: {
			height: '30px',
			fontFamily: 'avenirDemiBold',
		},
		md: {
			height: '35px',
		},
		lg: {
			height: '50px',
		},
	},
	defaultProps: {
		variant: 'secondary',
		size: 'md',
	},
};

export default addButtonStyleConfig;
