import { AxiosRequestConfig } from 'axios';
import { FactoryValue, HttpClientFactoryHelper } from '~/services/base/http-client/factory/helpers';

export class HttpClientFactory extends HttpClientFactoryHelper {
	public static instance = (defaults: AxiosRequestConfig = {}) => {
		const factory = new HttpClientFactory();
		Object.entries(defaults).forEach(([key, value]) => {
			factory.set(key as any, value);
		});
		return factory;
	};

	public withAuthorization = (authorization: string): HttpClientFactory => {
		return this.assign('headers.Authorization', () => authorization);
	};

	public set = <K extends keyof AxiosRequestConfig>(key: K, value: FactoryValue<K>) => {
		return this.rootAssign(key, value);
	};
}
