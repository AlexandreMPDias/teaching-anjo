import { ComponentMultiStyleConfig } from '@chakra-ui/theme';

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-24px)',
};

const formStyleConfig: Partial<ComponentMultiStyleConfig> = {
	variants: {
		floating: (props) => {
			console.log({ props });
			return {
				container: {
					_focusWithin: {
						label: {
							...activeLabelStyles,
						},
					},
					'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
						...activeLabelStyles,
					},
					label: {
						top: 0,
						left: 0,
						zIndex: 2,
						position: 'absolute',
						backgroundColor: 'transparent',
						pointerEvents: 'none',
						mx: 3,
						px: 1,
						my: 2,
						transformOrigin: 'left top',
					},
				},
			};
		},
	},
};

export default formStyleConfig;
