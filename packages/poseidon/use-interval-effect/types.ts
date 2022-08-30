export type Intervals = {
	node?: any;
	active: boolean;
};

export type OnRefreshCallback = () => void;

export interface TimerRefreshEffectProps {
	/**
	 * Function to be called on every interval iteration
	 *
	 * [WARNING] If you want the interval to change when onRefresh changes, you must
	 * pass it to the dependencies array.
	 */
	onRefresh: OnRefreshCallback;

	/**
	 * Whether the effect should be enabled or not
	 */
	readonly enabled: boolean;
	/**
	 * Frequency of the refresh in milliseconds
	 *
	 * @default {1000}
	 */
	readonly ms?: number;
}
