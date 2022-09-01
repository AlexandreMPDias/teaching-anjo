export const arrayRandomIndex = <V>(array: readonly V[]): number => {
	return (array.length * Math.random()) | 0;
};
