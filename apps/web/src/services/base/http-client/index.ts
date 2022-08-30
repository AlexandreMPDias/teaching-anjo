import { HttpClientFactory } from '~/services/base/http-client/factory';
import { HttpClientLoad } from '~/services/base/http-client/load';

export class HttpClient extends HttpClientLoad {
	public static factory = HttpClientFactory.instance;
}
