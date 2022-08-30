import colorsDeclaration from '../declaration';
import { AllFlattenedKeys } from '../types';

const isKey = <S extends Record<string, any>, K extends string>(
	key: K,
	obj: S
): key is Extract<K, keyof S> => key in obj;

export const getColor: {
	(key: AllFlattenedKeys): string;
	(key: string): string;
} = (key: AllFlattenedKeys | string): string => {
	if (key.includes('.')) {
		const [namespace, intensity] = key.split('.');
		if (isKey(namespace, colorsDeclaration)) {
			if (isKey(intensity, colorsDeclaration[namespace])) {
				return colorsDeclaration[namespace][intensity];
			}
		}
	} else if (isKey(key, colorsDeclaration)) {
		return colorsDeclaration[key];
	}
	return key;
};
