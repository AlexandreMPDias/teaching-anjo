type CastValue<Source, Target> = EnvProcessing<Target | Extract<Source, undefined>>;
type RequiredValue<Source> = EnvProcessing<Exclude<Source, undefined>>;

export class EnvProcessing<V> {
	constructor(private readonly name: string, private content: V) {}

	required = (): RequiredValue<V> => {
		if (this.content === undefined) {
			throw new Error(`Invalid environment variable: ${this.name} is required`);
		}
		return this as any;
	};

	defaultTo = (value: V): RequiredValue<V> => {
		if (this.content === undefined) {
			this.content = value;
		}
		return this as any;
	};

	json = (): CastValue<V, Record<string, any>> => {
		if (this.content) {
			try {
				this.content = JSON.parse(this.content as any);
			} catch (err) {
				this.abort(String(err));
			}
		}
		return this as any;
	};

	schema = <Schema extends Record<string, any>>(
		checker: (value: V) => boolean
	): CastValue<V, Schema> => {
		if (this.content && !checker(this.content)) {
			this.abort(`Value does not match schema`);
		}
		return this as any;
	};

	number = (): CastValue<V, number> => {
		if (this.content) {
			this.content = Number(this.content) as any;
			if (isNaN(this.content as any)) {
				this.abort(`Must be a number`);
			}
		}
		return this as any;
	};

	anyOf = <K extends string>(...values: K[]): CastValue<V, K> => {
		if (this.content && !values.includes(this.content as any)) {
			this.abort(`Expected one of ${values.join(', ')}`);
		}
		return this as any;
	};

	get value() {
		return this.content;
	}

	private abort = (...messages: string[]): never => {
		const parts = [
			`Invalid environment variable: ${this.name}`,
			`Received: ${this.content}`,
			...messages,
		];
		console.error(parts.join('\n'));
		throw new Error(parts.join('. '));
	};
}
