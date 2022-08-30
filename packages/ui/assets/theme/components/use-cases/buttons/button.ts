import { ComponentSingleStyleConfig } from '@chakra-ui/theme';
import { colors } from '../../../../colors';

const makeColor = (front: colors.Key, back: colors.Key) => {
	return { color: colors.get(front), bg: colors.get(back) };
};

const buttonStyleConfig: ComponentSingleStyleConfig = {
	baseStyle: {
		borderRadius: 'lg',
		marginTop: 6,
		fontFamily: 'avenirBold',
		mt: '0',
		fontSize: '18px',
		_disabled: {
			cursor: 'not-allowed',
		},
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	variants: {
		primary: {
			fontWeight: 'initial',
			fontFamily: 'avenirBold',
			fontSize: '18px',
			boxShadow: 'lg',
			...makeColor('primary.100', 'secondary.400'),
			_hover: {
				_disabled: makeColor('primary.400', 'secondary.400'),
				opacity: 0.8,
			},
			_disabled: {
				...makeColor('primary.400', 'secondary.400'),
			},
		},
		icon: {
			bg: 'transparent',
			borderWidth: '0px',
			_hover: {
				bg: 'rgba(0,0,0,0.1)',
			},
			fontFamily: 'avenirRegular',
		},
	},
	sizes: {
		sm: {
			height: '30px',
			fontSize: '16px',
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
		variant: 'primary',
		size: 'md',
	},
};

export default buttonStyleConfig;
