// Global Imports
import { useRef, MutableRefObject } from 'react';
import { OnRefreshCallback } from './types';

const setStartToNow = (startedRef: MutableRefObject<number>) => {
	startedRef.current = new Date().getTime();
};

const hasElapsedIntervalTime = (
	startedRef: MutableRefObject<number>,
	intervalTime: number
): boolean => {
	if (!startedRef.current) {
		setStartToNow(startedRef);
		return false;
	}
	const elapsed = new Date().getTime() - startedRef.current;
	const hasElapsed = elapsed >= intervalTime;
	if (hasElapsed) {
		setStartToNow(startedRef);
	}
	return hasElapsed;
};

/**
 * In development mode, we want to guard against the refresh being called too often.
 * There's a bug with some emulators that when debug mode is on, setInterval is called every millisecond.
 */
const useRefreshCallbackDev = (onRefresh: OnRefreshCallback, intervalTime: number) => {
	const startedRef = useRef<number>();
	return () => {
		if (hasElapsedIntervalTime(startedRef as any, intervalTime)) {
			onRefresh();
		}
	};
};

export const useRefreshCallback = (onRefresh: OnRefreshCallback, intervalTime: number) => {
	return useRefreshCallbackDev(onRefresh, intervalTime);
};
