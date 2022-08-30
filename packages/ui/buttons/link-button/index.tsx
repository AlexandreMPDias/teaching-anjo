import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useMultiStyleConfig, Link } from '@chakra-ui/react';
import { ILinkButtonProps } from './link-button-types';
import { Button } from '@chakra-ui/react';

const LinkButtonComponent = forwardRef((p: ILinkButtonProps, ref) => {
	const { href, ...props } = p;

	const selected = useRouter().pathname === p.href;
	const styles = useMultiStyleConfig('LinkButton', { ...p, selected });

	if (props.disabled) {
		return <Button as="a" ref={ref} sx={styles} {...props} />;
	}

	return (
		<Link as={NextLink} href={href}>
			<Button as="a" ref={ref} sx={styles} href={href} {...props} />
		</Link>
	);
});

export const LinkButton = LinkButtonComponent;
