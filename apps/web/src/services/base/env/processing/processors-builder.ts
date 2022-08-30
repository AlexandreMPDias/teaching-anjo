import { EnvValuesKeys, IEnvProcessor, IEnvValues } from '../types';
import { EnvProcessing } from './processor';

const composeValue = <K extends EnvValuesKeys>(builder: IEnvProcessor<K>): IEnvValues<K> => {
	const processor = new EnvProcessing(builder.envKey, process.env[builder.envKey]);

	return {
		...builder,
		value: builder.process(processor).value,
	};
};

export class EnvProcessorsBuilder<K extends EnvValuesKeys = never> {
	private readonly values: Record<EnvValuesKeys, IEnvValues<any>> = {} as any;

	add = <B extends Exclude<EnvValuesKeys, K>>(
		builder: IEnvProcessor<B>
	): EnvProcessorsBuilder<K | B> => {
		this.values[builder.key] = composeValue(builder);
		return this as any;
	};

	envs = (): { [Key in K]: IEnvValues<Key> } => {
		return this.values;
	};
}
