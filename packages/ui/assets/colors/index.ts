import { getColor } from './get-color';
import { Keys, AllFlattenedKeys, All } from './types';
import * as shade from './shade';
import all from './declaration';

export const colors = {
	get: getColor,
	all: new Proxy({} as any, {
		get: (_, key) => {
			if (typeof key === 'string') {
				return getColor(key);
			}
			return key;
		},
	}) as All,
	keys: new Proxy({} as any, {
		get: (_, key) => {
			if (typeof key === 'string') {
				return key.replace('_', '.');
			}
			return key;
		},
	}) as Keys,
	shade,
};

export declare namespace colors {
	export type Key = AllFlattenedKeys;
}

export default all;
