export interface BaseNToDecMagic {
	steps: string[];
	header: string;
	result: string;
}

const brackets = (value: string) => `(${value})`;

export function base_n_to_dec(input: string, base: number): BaseNToDecMagic {
	const split = String(input).split('');

	console.log(input, base);

	const parcels = split.map((digit, index) => {
		const potency = split.length - index - 1;
		const nDigit = parseInt(digit, base);
		return {
			i: potency,
			digit: {
				label: digit,
				value: nDigit,
			},
			value: nDigit * Math.pow(base, potency),
		};
	});

	console.log(parcels);

	const steps = [
		parcels
			.map(({ digit, i }) => `${digit.label} \\times ${base}^${i}`)
			.map(brackets)
			.join(' + '),
		base >= 10 &&
			parcels
				.map(({ digit, i }) => `${digit.value} \\times ${base}^${i}`)
				.map(brackets)
				.join(' + '),
		parcels
			.map(({ value }) => `${value}`)
			.map(brackets)
			.join(' + '),
		parcels.reduce((sum, { value }) => sum + value, 0),
	]
		.filter(Boolean)
		.map((x) => `$$ = ${x} $$`);

	const spread = () => {
		const alignment = 'c||' + 'c'.repeat(parcels.length).split('').join('|');
		const topRow = ['v[i]', ...parcels.map(({ digit }) => digit.label)];
		const lowerRow = ['i', ...parcels.map(({ i }) => i)];

		const rasterize = (col: (string | number)[]) => col.join('&') + '\\\\';

		return `$$ \\begin{array}{|${alignment}|}
		${rasterize(topRow)}
		${rasterize(lowerRow)}
		\\end{array} $$`;
	};

	return {
		header: spread(),
		steps,
		result: `$$ (${input})_{${base}} = (${parseInt(input, base)})_{10} $$`,
	};
}
