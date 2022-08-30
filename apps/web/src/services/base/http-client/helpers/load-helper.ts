import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Http } from '~/models/data/http';
import queryParser from '~/services/base/http-client/helpers/queryParser';
import { createAxiosInstance } from '~/services/base/http-client/helpers/create-instance';
import { HttpClientSetupFn, HttpRequestOptions } from '~/services/base/http-client/types';

export class HttpClientHelper {
	protected readonly instance: AxiosInstance;
	constructor(protected readonly setups: HttpClientSetupFn[]) {
		this.instance = createAxiosInstance(setups);
	}

	protected wrapRequest = async <Data>(
		request: Promise<AxiosResponse<Data>>
	): Promise<Http.Response<Data>> => {
		try {
			return this.parseResponse(await request);
		} catch (err) {
			if (err instanceof AxiosError && err.response) {
				return this.parseResponse(err.response);
			}
			throw err;
		}
	};

	protected getConfig = (options: HttpRequestOptions): AxiosRequestConfig => {
		const requestConfig: AxiosRequestConfig = {};

		if (options.params) {
			requestConfig.paramsSerializer = queryParser;
			requestConfig.params = options.params;
		}
		if (options.headers) {
			requestConfig.headers = options.headers;
		}

		return requestConfig;
	};

	protected parseResponse = <Data>(response: AxiosResponse<Data>): Http.Response<Data> => {
		return {
			...response,
			success: response.status >= 200 && response.status < 300,
		};
	};
}
