import { LoadEnvService } from './load';
import { loadEnvValues } from './processing';
import { IEnvironmentService } from './types';

export const Environment: IEnvironmentService = new LoadEnvService(loadEnvValues());
