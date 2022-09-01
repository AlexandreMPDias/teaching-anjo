export const arrayRandomElement = <V>(array: readonly V[]): V => {
	return array[(array.length * Math.random()) | 0];
};
