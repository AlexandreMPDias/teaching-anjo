import {
	Box,
	Flex,
	Grid,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { LinkButton } from '@angel-oak/ui/buttons/link-button';
import Latex from 'react-latex';
import { HamburgerIcon } from '@chakra-ui/icons';

interface HeaderButton {
	readonly href: string;
	readonly label: string | JSX.Element;
	readonly latex?: boolean;
}

interface HeaderButtonGroup {
	readonly title: string;
	readonly buttons: readonly HeaderButton[];
}

const make =
	<K extends any>() =>
	(value: K): K =>
		value;
const makeGroup = make<HeaderButtonGroup>();

const buttonGroups = {
	changeBase: makeGroup({
		title: 'Mudar a Base',
		buttons: [
			{ href: '/base-conv/n-to-10', label: 'Base_{n} \\Rightarrow Base_{10}', latex: true },
			{ href: '/base-conv/10-to-n', label: 'Base_{10} \\Rightarrow Base_{n}', latex: true },
		],
	}),
};

const ButtonGroup: React.FC<HeaderButtonGroup> = ({ title, buttons }) => {
	return (
		<MenuGroup title={title}>
			{buttons.map(({ href, label, latex }) => {
				const content = latex ? <Latex>{`$$ ${label} $$`}</Latex> : <>{label}</>;
				return (
					<MenuItem key={href}>
						<LinkButton href={href} border="none">
							{content}
						</LinkButton>
					</MenuItem>
				);
			})}
		</MenuGroup>
	);
};

export const Header: React.FC = () => {
	const height = '50px';
	return (
		<>
			<Box p={'5px'} position="fixed" top={0} bg="background" w="100%" zIndex={100}>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<HamburgerIcon />}
						variant="outline"
						color="pink.400"
					/>
					<MenuList color="pink.400">
						<ButtonGroup {...buttonGroups.changeBase} />
						<MenuDivider />
					</MenuList>
				</Menu>
			</Box>
			<Box h="50px" />
		</>
	);
};
