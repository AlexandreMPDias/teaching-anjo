import { ComponentSingleStyleConfig } from '@chakra-ui/theme';
import { SystemStyleObject } from '@chakra-ui/system';
import { colors } from '../../../../colors';

const makeColor = (front: colors.Key, back: colors.Key) => {
	return { color: colors.get(front), bg: colors.get(back) };
};

const buttonStyleConfig: ComponentSingleStyleConfig = {
	baseStyle: {
		borderRadius: 'lg',
		marginTop: 6,
		fontFamily: 'medium',
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
			fontFamily: 'bold',
			fontSize: '18px',
			boxShadow: 'lg',
			...makeColor('neutral.100', 'primary.400'),
			_hover: {
				_disabled: {
					bgColor: 'secondary.400',
				},
				...makeColor('neutral.200', 'secondary.400'),
			},
			_disabled: {
				boxShadow: 'lg',
				...makeColor('neutral.200', 'secondary.400'),
			},
		},
		header: (props) => {
			const style: SystemStyleObject = {
				...makeColor('primary.400', 'transparent'),
				borderColor: colors.all.primary_400,
				borderStyle: 'solid',
				borderBottomWidth: '1px',
				borderRadius: 0,
				bg: 'transparent',
				fontFamily: 'regular',
				p: '20px',
				outline: 'none',
				_hover: {
					_disabled: {
						bgColor: 'neutral.300',
					},
					bgColor: 'primary.100',
					pb: '20px',
				},
				_disabled: makeColor('primary.100', 'neutral.100'),
				_focus: {
					outline: 'none',
				},
			};
			if (!props.selected) {
				style.borderColor = 'neutral.300';
			}
			return style;
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
