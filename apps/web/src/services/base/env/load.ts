import { EnvValuesKeys, IEnvironmentService, IEnvValues } from './types';

export class LoadEnvService implements IEnvironmentService {
	constructor(private readonly envs: { [K in EnvValuesKeys]: IEnvValues<K> }) {}

	get = (key: EnvValuesKeys, defaultValue?: any) => {
		return this.envs[key].value || defaultValue;
	};
}
