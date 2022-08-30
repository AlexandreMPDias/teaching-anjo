import React from 'react';

export const useComponentsInProps = <P extends any>(
	Component: React.FC<P> | undefined,
	Fallback: React.FC<P>
) => {
	return Component || Fallback;
};
