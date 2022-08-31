class MathExpression {
	constructor(value, label) {
		this.value = value;
		this.label = label;
	}
}

const MathExp = {
	multiply: (a, b) => new MathExpression(a * b, `( $${a} \\times ${b}$ )`),
	sum: (...args) =>
		new MathExpression(
			args.reduce((a, b) => a + b, 1),
			args.join(` + `)
		),
	pot: (a, b) =>
		new MathExpression(Math.pow(a, b), `<span>${a}<span class="potency">${b}</span></span>`),
};

function base_n_to_dec(input, base) {
	const split = String(input).split('');
	base = Number(base);

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

	const steps = [
		parcels.map(({ digit, i }) => `\\(${digit.label} \\times ${base}^${i}\\)`).join(' + '),
		base >= 10 &&
			parcels.map(({ digit, i }) => `\\(${digit.value} \\times ${base}^${i}\\)`).join(' + '),
		parcels.map(({ value }) => `\\(${value}\\)`).join(' + '),
		parcels.reduce((sum, { value }) => sum + value, 0),
	].filter(Boolean);

	const spread = () => {
		const alignment = 'c||' + 'c'.repeat(parcels.length).split('').join('|');
		const topRow = ['v[i]', ...parcels.map(({ digit }) => digit.label)];
		const lowerRow = ['i', ...parcels.map(({ i }) => i)];

		const rasterize = col => col.join('&') + '\\\\';

		return `
		<div class="latex">
		\\begin{tabular}{|${alignment}|}
			${rasterize(topRow)}
			${rasterize(lowerRow)}
		\\end{tabular}
		</div>`;
	};

	return `<div>
		<h1 class="latex">(${input})_{${base}} \\Rightarrow (?)_{10}</h1>
		<div class="spread">
			${spread()}
		</div>
		<div class="steps">
			${steps.map(step => `<div class="latex step">= ${step}</div>`).join('')}
		</div>
		<h1 class="latex">(${input})_{${base}} \\Rightarrow (${parseInt(input, base)})_{10}</h1>
	</div>`;
}
