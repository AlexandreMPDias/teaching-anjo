export interface EnvironmentSchema {
	env: 'dev' | 'staging' | 'prod' | 'test';
	other?: number;
}
