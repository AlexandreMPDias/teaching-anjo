import { EnvProcessing } from './processing/processor';
import { EnvironmentSchema } from './schema';

export type EnvValuesKeys = keyof EnvironmentSchema;

export type OptionalKeys = {
	[K in EnvValuesKeys]: undefined extends EnvironmentSchema[K] ? K : never;
}[EnvValuesKeys];

export interface IEnvironmentService {
	get<K extends EnvValuesKeys>(key: K): EnvironmentSchema[K];
	get<K extends OptionalKeys>(
		key: K,
		defaultValue: Required<EnvironmentSchema>[K]
	): Required<EnvironmentSchema>[K];
}

export type EnvProcessingFn<K extends EnvValuesKeys> = (
	processing: EnvProcessing<string | undefined>
) => EnvProcessing<EnvironmentSchema[K]>;

export interface IEnvProcessor<K extends EnvValuesKeys> {
	readonly key: K;
	readonly envKey: string;
	readonly process: EnvProcessingFn<K>;
}

export interface IEnvValues<K extends EnvValuesKeys> extends IEnvProcessor<K> {
	readonly value: EnvironmentSchema[K];
}
