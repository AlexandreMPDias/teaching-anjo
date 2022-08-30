type WithDefaultProps<P, K extends keyof P> = Omit<P, K> & Partial<Pick<P, K>>;

export const addDefaultProps = <P, K extends keyof P>(
	Component: React.FC<P>,
	defaultProps: Pick<P, K>
): React.FC<WithDefaultProps<P, K>> => {
	Component.defaultProps = defaultProps as any;
	return Component as any;
};
