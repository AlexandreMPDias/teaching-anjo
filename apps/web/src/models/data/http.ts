export declare namespace Http {
	export interface Response<Data = any> {
		readonly data: Data;
		readonly headers: Record<string, string>;
		readonly status: number;
		readonly success: boolean;
	}
}
