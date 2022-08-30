import { AxiosRequestConfig } from 'axios';

export interface HttpRequestConfig {
	request: AxiosRequestConfig;
}
export type HttpClientSetupFn = (config: AxiosRequestConfig) => AxiosRequestConfig;

export interface HttpRequestOptions {
	headers?: Record<string, string | number | boolean>;
	params?: object;
}
