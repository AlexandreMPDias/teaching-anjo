import { HttpClientSetupFn } from '~/services/base/http-client/types';
import { assocPath } from 'ramda';
import { AxiosRequestConfig } from 'axios';
import { HttpClientLoad } from '~/services/base/http-client/load';

type ValueOrDispatch<T> = T; // | ((prev: T) => T);
export type FactoryValue<K extends keyof AxiosRequestConfig> = ValueOrDispatch<
	AxiosRequestConfig[K]
>;

export class HttpClientFactoryHelper {
	protected readonly setups: HttpClientSetupFn[] = [];

	protected assign = (path: string, value: unknown): this => {
		return this.appendSetup((config: AxiosRequestConfig) =>
			assocPath(path.split('.'), value, config)
		);
	};

	protected appendSetup = (setup: HttpClientSetupFn): this => {
		this.setups.push(setup);
		return this;
	};

	protected rootAssign = <K extends keyof AxiosRequestConfig>(
		key: K,
		value: FactoryValue<K>
	): this => {
		return this.appendSetup((config: AxiosRequestConfig) => {
			const prev = config[key];
			const next = value;
			// const next = typeof value === 'function' ? (value as any)(prev) : value;
			config[key] = next;
			return config;
		});
	};

	public factory = () => {
		return new HttpClientLoad(this.setups);
	};
}
