import { getColor } from '../get-color';

/**
 * Verifies if color is light or dark,
 * returning color picker's label color (white or darkestGray)
 *
 * @param color
 *
 * @return string: color picker's label color
 */
export const hsp = (color: string): string => {
	const hexNumber = +('0x' + color.slice(1).replace(color.length < 5 ? /./g : '', '$&$&'));

	// Convert to RGB: http://gist.github.com/983661
	const R = hexNumber >> 16;
	const G = (hexNumber >> 8) & 255;
	const B = hexNumber & 255;

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	const hsp = Math.sqrt(0.299 * (R * R) + 0.587 * (G * G) + 0.114 * (B * B));

	return hsp > 127.5 ? getColor('neutral.600') : getColor('white');
};
