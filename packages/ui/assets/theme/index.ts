import { extendTheme } from '@chakra-ui/react';
import colors from '../colors';
import { Fonts } from '../fonts';
import breakPoints from './break-points';
import components from './components';

export default extendTheme({
	colors: colors,
	fonts: {
		...Fonts.nameMap,
		heading: 'avenirDemiBold',
		body: 'avenirRegular',
	},
	styles: {
		global: {
			body: {
				bg: 'background.page',
				color: 'neutral.100',
				height: '100%',
				'#__next': {
					height: '100%',
				},
			},
			html: {
				height: '100%',
			},
		},
	},
	breakPoints,
	components,
});
