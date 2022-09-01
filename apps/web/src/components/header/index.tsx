import { Flex, Box, HStack } from '@chakra-ui/react';
import { LinkButton } from '@angel-oak/ui/buttons/link-button';
import Latex from 'react-latex';

const buttons: Array<{ href: string; label: string | JSX.Element; latex?: boolean }> = [
	// { href: '/', label: 'Home' },
	// { href: '/base-conv', label: 'Conversão de Base' },
	{ href: '/base-conv/n-to-10', label: 'Base_{n} \\Rightarrow Base_{10}', latex: true },
	{ href: '/base-conv/10-to-n', label: 'Base_{10} \\Rightarrow Base_{n}', latex: true },
];

export const Header: React.FC = () => {
	return (
		<Flex bg="background.header" overflowX={'auto'} pb="2px">
			<HStack gap="5px" justifyContent={'center'} flexGrow={1}>
				{buttons.map(({ href, label, latex }) => {
					const content = latex ? <Latex>{`$$ ${label} $$`}</Latex> : <>{label}</>;
					return (
						<LinkButton key={href} variant={'header'} href={href} border="none">
							<small>{content}</small>
						</LinkButton>
					);
				})}
			</HStack>
		</Flex>
	);
};
