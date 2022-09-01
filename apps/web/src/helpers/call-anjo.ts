import { arrayShuffle } from '@angel-oak/utils/array/shuffle';

interface Options {
	capitalize?: boolean;
	unpossesive?: boolean;
}

const createAlternatives = () => [
	'meu Anjo',
	'meu Broto',
	'meu Xuxu',
	'minha Abençoada',
	'minha Adorável',
	'minha Delícia',
	'minha Deusa',
	'minha Dona',
	'minha Doutora em Veterinária',
	'minha Esplêndida',
	'minha Fervorosa',
	'minha Gasosa',
	'minha Gata',
	'minha Linda',
	'minha Bela Adormecida',
	'minha Vida',
	'minha Gostosa',
	'minha Graciosa',
	'minha Minhoca',
	'minha Preguiça',
	'minha Princesa',
	'minha Rainha',
	'minha Rei',
	'minha Suculência',
];

class CallRank {
	private toBeCalled: Array<string> = [];
	private calls: number = 0;

	constructor() {
		this.reset();
	}

	get = (): string => {
		const next = this.toBeCalled[this.calls++];
		if (!next || this.calls > 20) {
			this.reset();
			return this.get();
		}
		return next;
	};

	private reset = () => {
		this.toBeCalled = arrayShuffle(createAlternatives());
		this.calls = 0;
	};
}

const callRank = new CallRank();

export const callAnjo = (options?: Options): string => {
	let value = callRank.get();

	if (options?.capitalize) value = value.charAt(0).toUpperCase() + value.slice(1);
	if (options?.unpossesive) {
		value = value.split(' ', 2)[1] ?? value;
	}
	return value;
};
