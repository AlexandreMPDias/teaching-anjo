const brackets = (value: string | number) => `(${value})`;

export class BaseDecToN {
	constructor(private readonly value: number, private readonly base: number) {}

	public get parts() {
		return this.cache(
			'parts',
			(): ReadonlyArray<{ bit: number; value: number; prev: number }> => {
				const parts: Array<[number, number, number]> = [];

				let mod = 0;
				let value = this.value;
				let prev = this.value;

				let index = 0;
				while (true) {
					index++;
					mod = value % this.base;
					value = Math.floor(value / this.base);
					parts.push([mod, value, prev]);
					console.log({ value, mod, prev, base: this.base });
					if (prev < this.base || index >= 50) {
						break;
					}
					prev = value;
				}
				return parts.map(([mod, value, prev]) => ({ bit: mod, value, prev }));
			}
		);
	}

	public get table() {
		return this.cache('table', () => {
			const rTable = `\\begin{array}{|c|c|}
				${this.parts.map(({ value, bit: mod }) => ` ${value} & ${mod} \\cfrac{}{} \\\\`).join('')}
			\\end{array}`;

			const lTable = `\\begin{array}{|l|}
				${this.parts
					.map(
						({ value, bit: mod, prev }) =>
							`\\hline \\frac{${prev}}{\\textrm{base}} = \\frac{${prev}}{${this.base}} \\equiv ${value} \\pmod{${mod}} \\cfrac{}{} \\\\`
					)
					.join('')}
					\\hline \\end{array}`;

			return `$$ ${lTable} \\Rightarrow ${rTable} $$`;
		});
	}

	public get vector() {
		return this.cache('vector', () => {
			const bits = Array.from(this.parts).reverse();
			const alignment = 'c'.repeat(bits.length).split('').join('|');
			return `$$ \\begin{array}{|${alignment}|}
				\\hline
				${bits.map(({ bit }) => bit).join('&')} \\cfrac{}{} \\\\
				\\hline
			\\end{array} $$`;
		});
	}

	public get result() {
		return this.cache('result', () => {
			return `$$ (${this.value})_{10} = (${this.value.toString(this.base)})_{${
				this.base
			}} $$`;
		});
	}

	private cache = <V>(k: string, composer: () => V): V => {
		const key = `#__${k}`;
		if (!(key in this)) {
			(this as any)[key] = composer();
		}
		return (this as any)[key];
	};
}

export function base_dec_to_n(input: number, base: number): BaseDecToN {
	return new BaseDecToN(input, base);
}
