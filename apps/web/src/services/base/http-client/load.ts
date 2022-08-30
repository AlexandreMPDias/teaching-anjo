import { Http } from '~/models/data/http';
import { HttpClientHelper } from '~/services/base/http-client/helpers/load-helper';
import { HttpRequestOptions } from '~/services/base/http-client/types';

export class HttpClientLoad extends HttpClientHelper {
	public async get<Data>(
		url: string,
		options: HttpRequestOptions = {}
	): Promise<Http.Response<Data>> {
		const instance = this.instance;
		const config = this.getConfig(options);

		return this.wrapRequest(instance.get(url, config));
	}

	public async post<Data>(
		url: string,
		data: object,
		options: HttpRequestOptions = {}
	): Promise<Http.Response<Data>> {
		const instance = this.instance;
		const config = this.getConfig(options);

		return this.wrapRequest(instance.post(url, data, config));
	}
}
