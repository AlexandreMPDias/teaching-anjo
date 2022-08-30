/**
 * Change the darkness/brightness
 *
 * Check https://stackoverflow.com/a/13532993/7050326 for documentation
 *
 * @param {string} color a hex-color
 * @param {number} percent a number from -100 to 100
 *
 * @return {string}
 */
function shadeColor(color: string, percent: number): string {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt('' + (R * (100 + percent)) / 100);
	G = parseInt('' + (G * (100 + percent)) / 100);
	B = parseInt('' + (B * (100 + percent)) / 100);

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
	const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
	const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

	return '#' + RR + GG + BB;
}

export interface Shader {
	/**
	 * Dims a color
	 *
	 * @param {string} color a hex-color
	 * @param {number} amount a number from 0 to 1
	 *
	 * @return {string}
	 */
	(color: string, amount: number): string;
	(color: undefined, amount: number): undefined;
}

/**
 * Brightens a color
 *
 * Check https://stackoverflow.com/a/13532993/7050326 for documentation
 *
 * @param {string|undefined} color a hex-color
 * @param {number} percent a number from 0 to 1
 *
 * @return {string|undefined}
 */
export const brighten: Shader = ((color: string | undefined, amount: number): string | undefined => {
	if (color) {
		return shadeColor(color, amount * 100);
	}
	return undefined;
}) as any;

/**
 * Dims a color
 *
 * Check https://stackoverflow.com/a/13532993/7050326 for documentation
 *
 * @param {string|undefined} color a hex-color
 * @param {number} percent a number from 0 to 1
 *
 * @return {string}
 */
export const darken: Shader = ((color: string | undefined, amount: number): string | undefined => {
	if (color) {
		return shadeColor(color, -(amount * 100));
	}
	return undefined;
}) as any;
