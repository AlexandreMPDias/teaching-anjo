const getElements = () => {
	return {
		tab: {
			main: document.getElementById('tab'),
			title: document.getElementById('tab-title'),
		},
		main: document.getElementById('main'),
		headers: document.getElementById('header'),
		baseInput: document.getElementById('base-input'),
		input: document.getElementById('value-input'),
		button: document.getElementById('calculate'),
	};
};

class State {
	constructor() {
		this.selected = 'n2dec';
		this.base = '2';
		this.input = '10110100';
	}
}

class Tabs {
	/**
	 * @param {ReturnType<typeof getElements>} elements
	 * @param {State} state
	 */
	constructor(elements, state) {
		this._elements = elements;
		this._state = state;
		this._inputValue = {};
	}

	update = () => {
		Array.from(this._elements.headers.children).forEach(head =>
			head.classList[this._state.selected === head.id ? 'add' : 'remove']('header_selected')
		);
		let bases = [`(Base)_{${this._state.base}}`, `(Base)_{10}`];
		if (this._state.selected === 'n2dec') {
			bases = bases.reverse();
		}
		const [initial, final] = bases;
		this._elements.tab.title.innerHTML = `<h1 class="latex">${initial} \\Rightarrow ${final}</h1>`;
		updateLatex();
	};
}

function main() {
	const elements = getElements();
	const state = new State();
	const tabs = new Tabs(elements, state);

	tabs.update();
	Array.from(elements.headers.children).forEach(head => {
		head.addEventListener('click', function (e) {
			e.preventDefault();
			const nextSelected = String(head.id).replace('_header', '');
			if (state.selected !== nextSelected) {
				state.selected = nextSelected;
				tabs.update();
			}
		});
	});
	elements.input.addEventListener('change', e => (state.input = e.target.value));
	elements.baseInput.addEventListener('change', e => (state.base = e.target.value));

	elements.button.addEventListener('click', e => {
		e.preventDefault();

		elements.main.innerHTML = base_n_to_dec(state.input, state.base);

		updateLatex();
	});
}

main();
