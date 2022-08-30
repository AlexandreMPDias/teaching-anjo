import { ComponentMultiStyleConfig } from '@chakra-ui/theme';
import { Fonts } from '../../../../../fonts';

export interface Model {
	size: number | string;
	family: Fonts;
}

export default (model: Model): ComponentMultiStyleConfig => {
	const config: ComponentMultiStyleConfig = {
		parts: ['container', 'icon', 'text'],
		baseStyle: {
			container: {
				justifyContent: 'center',
				alignItems: 'center',
				userSelect: 'none',
			},
			text: {
				fontFamily: Fonts.get(model.family),
				fontSize: model.size,
				userSelect: 'none',
			},
			icon: {
				color: 'inherit',
				marginRight: '6px',
			},
		},
		defaultProps: {},
	};

	return config;
};
