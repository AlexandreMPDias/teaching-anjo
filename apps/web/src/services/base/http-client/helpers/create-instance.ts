import axios from 'axios';
import { HttpClientSetupFn } from '~/services/base/http-client/types';

export const createAxiosInstance = (setups: HttpClientSetupFn[]) => {
	return axios.create(setups.reduce((config, setup) => setup(config), {}));
};
