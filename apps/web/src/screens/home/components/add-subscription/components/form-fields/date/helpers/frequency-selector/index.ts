import { IBillSubscription } from '@angel-oak/core/models/schemas';

type Freq = IBillSubscription.Frequency;

export interface IFrequencySelector {
	<T>(shape: Partial<Record<Freq, T>> & { default: T }): T;
	<T>(shape: Record<Freq, T>): T;
	<T>(shape: Partial<Record<Freq, T>>): T | null;
}

export const makeFrequencySelector = (frequency: Freq): IFrequencySelector => {
	return (shape: Partial<Record<Freq, any>> & { default?: any }): any => {
		if (frequency in shape) {
			return shape[frequency];
		}
		if ('default' in shape) {
			return shape.default;
		}
		return null;
	};
};
