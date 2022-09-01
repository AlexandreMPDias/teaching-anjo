function shuffleArray(arr: any[]) {
	for (let i: number = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

export const arrayShuffle = <V>(array: readonly V[] | V[]): V[] => {
	const copy = Array.from(array);
	shuffleArray(copy);
	return copy;
};
