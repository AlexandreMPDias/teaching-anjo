import { Flex, Box } from '@chakra-ui/react';
import { LinkButton } from '@angel-oak/ui/buttons/link-button';

const buttons: Array<{ href: string; label: string }> = [
	{ href: '/', label: 'Home' },
	{ href: '/base-conv', label: 'Conversão de Base' },
	{ href: '/base-conv/n-to-10', label: 'Base N => Base 10' },
];

export const Header: React.FC = () => {
	return (
		<Flex borderBottom={'1px solid'} borderColor="primary.400" bg="background.header">
			<Flex gap="0px" px="20px">
				{buttons.map(({ href, label }) => (
					<LinkButton key={label} variant={'header'} href={href} mb={'-1px'}>
						{label}
					</LinkButton>
				))}
			</Flex>
		</Flex>
	);
};
