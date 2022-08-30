// Global Imports
import { useEffect, useRef, MutableRefObject } from 'react';
import { useRefreshCallback } from './use-refresh';
import { Intervals, TimerRefreshEffectProps } from './types';

function stopInterval(intervals: MutableRefObject<Intervals>, unmounting?: boolean): void {
	if (intervals.current.active) {
		clearInterval(intervals.current.node);
		if (!unmounting) intervals.current = { active: false };
	}
}

function startInterval(
	intervals: MutableRefObject<Intervals>,
	onRefresh: () => void,
	ms: number
): void {
	stopInterval(intervals);
	intervals.current.active = true;
	intervals.current.node = setInterval(onRefresh, ms);
}

export const useIntervalEffect = (props: TimerRefreshEffectProps, deps: any[]) => {
	// Refs
	const { enabled, ms = 1000 } = props;
	const intervals = useRef<Intervals>({ active: true });
	const onRefresh = useRefreshCallback(props.onRefresh, ms);

	useEffect(() => {
		if (enabled) {
			startInterval(intervals, onRefresh, ms);
		} else {
			stopInterval(intervals);
		}
	}, deps.concat([enabled, ms]));

	useEffect(() => {
		return () => {
			stopInterval(intervals, true);
		};
	}, []);
};
