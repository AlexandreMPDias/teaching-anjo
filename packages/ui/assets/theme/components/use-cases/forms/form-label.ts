import { colors } from '../../../../colors';
import { FormLabel } from '@chakra-ui/theme/dist/declarations/src/components';

type FormLabelStyleConfig = Partial<typeof FormLabel>;

const formLabelStyleConfig: FormLabelStyleConfig = {
	baseStyle: {
		fontSize: 'md',
		marginEnd: 3,
		mb: 2,
		fontWeight: 'medium',
		transitionProperty: 'common',
		transitionDuration: 'normal',
		opacity: 1,
		color: colors.keys.neutral_400,
		_disabled: {
			opacity: 0.4,
		},
	},
};

export default formLabelStyleConfig;
