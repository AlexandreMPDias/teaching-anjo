import { TagProps } from '@chakra-ui/react';

export type TagStyle = Required<Pick<TagProps, 'bg' | 'color'>>;

export interface TagData extends TagStyle {
	label: string;
}
