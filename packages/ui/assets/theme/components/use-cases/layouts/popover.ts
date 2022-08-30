import { ComponentSingleStyleConfig } from '@chakra-ui/theme';

const popoverStyleConfig: ComponentSingleStyleConfig = {
	variants: {
		responsive: {
			popper: {
				maxWidth: 'unset',
				width: 'unset',
			},
		},
	},
};

export default popoverStyleConfig;
