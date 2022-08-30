import { LinkProps } from 'next/link';
import { ButtonProps } from '@chakra-ui/react';
import { ParsedUrlQueryInput } from 'node:querystring';

type Optional<V> = V | null | undefined;

export type Routes = string;

export type LinkHref = {
	auth?: Optional<string>;
	hash?: Optional<string>;
	host?: Optional<string>;
	hostname?: Optional<string>;
	href?: Optional<string>;
	pathname?: Optional<Routes>;
	protocol?: Optional<string>;
	search?: Optional<string>;
	slashes?: Optional<boolean>;
	port?: Optional<string | number>;
	query?: Optional<string | ParsedUrlQueryInput>;
};

export interface ILinkButtonProps extends ButtonProps, Omit<LinkProps, 'href' | 'as'> {
	href: string;
}
