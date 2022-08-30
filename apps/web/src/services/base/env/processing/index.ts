import { EnvValuesKeys, IEnvValues } from '../types';
import { EnvProcessorsBuilder } from './processors-builder';

export const loadEnvValues = (): { [K in EnvValuesKeys]: IEnvValues<K> } => {
	const builder = new EnvProcessorsBuilder();
	return builder
		.add({
			key: 'env',
			envKey: 'NODE_ENV',
			process: (validation) => validation.anyOf('dev', 'staging', 'prod', 'test').required(),
		})
		.add({
			key: 'other',
			envKey: 'WHAT',
			process: (validation) => validation.number(),
		})
		.envs();
};
