import React from 'react';

import Content, { IAllContentProps } from './use-cases';
import ContentTypesUtils from './content-types';

export interface IAnyContentProps extends IAllContentProps {}

export default (props: IAnyContentProps) => {
	return (
		<Content.Loading loading={props.loading}>
			<Content.Error error={props.error}>{props.children}</Content.Error>
		</Content.Loading>
	);
};

export declare namespace IAnyContentProps {
	export type Pure = ContentTypesUtils.MakePureProps<IAllContentProps>;
}
