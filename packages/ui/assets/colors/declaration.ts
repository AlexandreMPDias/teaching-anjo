const baseColors = {
	secondary: {
		100: '#99bedd',
		400: '#2f5777',
		700: '#0C2D48',
	},
	primary: {
		100: '#ebefce',
		400: '#c8ce98',
		700: '#5c8b7b',
	},

	neutral: {
		100: '#FFFFFF',
		200: '#F0F0F0',
		300: '#D4D4D4',
		400: '#AAAAAA',
		500: '#707070',
		600: '#555555',
		700: '#2A2A2A',
	},

	// Denotative Colors
	warning: '#E52B33',
	success: '#5EAE04',
	bg_error: '#FFEBEC',
	bg_success: '#EDF6E3',
	facebook: '#3C5A99',

	// White
	white: '#FFFFFF',
	black: '#000000',

	// Darker
	darker: 'rgba(0, 0, 0, 0.16)',
	lighter: 'rgba(255, 255, 255, 0.16)',

	// Transparent
	transparent: 'transparent',
};

export default {
	...baseColors,
	form: {
		label: baseColors.neutral[700],
	},
	background: {
		page: '#03121e',
		card: '#051d30',
		header: baseColors.secondary[700],
	},
};
