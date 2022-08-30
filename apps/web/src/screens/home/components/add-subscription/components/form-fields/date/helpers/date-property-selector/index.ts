import { IBillSubscription } from '@angel-oak/core/models/schemas';

type Property = 'weekday' | 'month' | 'year';

export interface IDatePropertySelector {
	<T>(shape: Partial<Record<Property, T>> & { default: T }): T;
	<T>(shape: Record<Property, T>): T;
	<T>(shape: Partial<Record<Property, T>>): T | null;
}

export const makeDatePropertySelector = (frequency: Property): IDatePropertySelector => {
	return (shape: Partial<Record<Property, any>> & { default?: any }): any => {
		if (frequency in shape) {
			return shape[frequency];
		}
		if ('default' in shape) {
			return shape.default;
		}
		return null;
	};
};
