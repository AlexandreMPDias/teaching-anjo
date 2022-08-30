import CasesContent, { IErrorContentProps, ILoadingContentProps } from './use-cases';
import LoadContent from './any-content';

export type { IErrorContentProps, ILoadingContentProps };

export const AnyContent = Object.assign(LoadContent, CasesContent);

export * from './any-content';

export type { Content } from './content-types';
