import Error, { IErrorContentProps } from './error-content';
import Loading, { ILoadingContentProps } from './loading-content';

export default {
	Error,
	Loading,
};

export type { IErrorContentProps, ILoadingContentProps };

export type IAllContentProps = IErrorContentProps & ILoadingContentProps;
