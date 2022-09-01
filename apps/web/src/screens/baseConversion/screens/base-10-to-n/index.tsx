import {
	Button,
	Center,
	Input,
	InputGroup,
	InputLeftAddon,
	FormErrorMessage,
	FormControl,
	VStack,
	Text,
	Stack,
	Divider,
	Box,
} from '@chakra-ui/react';
import { Screen } from '@angel-oak/ui/layouts/screen';
import React, { useMemo, useState } from 'react';
import { BaseDecToN, base_dec_to_n } from './magic';
import Latex from 'react-latex';
import { callAnjo } from '~/helpers/call-anjo';
import { Scrollable } from '@angel-oak/ui/layouts/scrollable';

const InputField: React.FC<{
	label: string;
	value?: number;
	onChangeValue(value: number): void;
	error?: string | null;
}> = (props) => {
	return (
		<FormControl isInvalid={!!props.error}>
			<InputGroup mt={'5px'}>
				<InputLeftAddon children={props.label} />
				<Input
					type={'text'}
					value={props.value || ''}
					color="white"
					onChange={(e) => props.onChangeValue(Number(e.target.value.replace(/\D/g, '')))}
				/>
			</InputGroup>
			<FormErrorMessage>{props.error}</FormErrorMessage>
		</FormControl>
	);
};

const Section: React.FC<{ children?: React.ReactNode; latex: string }> = (props) => {
	return (
		<Center>
			<VStack>
				{props.children && <Text>{props.children}</Text>}
				<Latex>{props.latex}</Latex>
			</VStack>
		</Center>
	);
};

const Content: React.FC<{ math: BaseDecToN | null }> = ({ math }) => {
	if (!math) return null;
	const { table, vector, result } = math;

	// return (
	// 	<>
	// 		{new Array(30).fill(0).map((_, i) => {
	// 			return (
	// 				<Box key={i} boxSize="80px" bg="red" border="1px solid black">
	// 					Box: {i}
	// 				</Box>
	// 			);
	// 		})}
	// 	</>
	// );

	return (
		<Stack display="flex" flexDirection={'column'} flexGrow={0.3}>
			<VStack gap="5px" flexGrow={1}>
				<Section latex={table} />
				<Section latex={vector}>
					Ai <b>{callAnjo()}</b>, você pega o array de "restos" começando pelos números
					mais a baixo ficando mais a esquerda
				</Section>
				<Section latex={result} />
			</VStack>
			<Text color="gray.500" w="100%">
				<small style={{ display: 'flex', flexDirection: 'column' }}>
					* {callAnjo()},{' '}
					<Latex>{`$$ \\begin{array}{|c|} \\hline \\cfrac{a}{b} \\equiv m \\pmod{n} \\\\ \\\\ \\hline \\end{array}$$ `}</Latex>
					lê-se: a/b é igual a m, com resto n
				</small>
			</Text>
		</Stack>
	);
};

export const Base10ToBaseNScreen: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<number>();
	const [base, setBase] = useState<number>(2);
	const [math, setMath] = useState<BaseDecToN | null>(null);

	const title = useMemo(() => {
		return `$(${input || 'Base'})_{10} \\Rightarrow (?)_{${base}}$`;
	}, [base, input]);

	return (
		<Screen overflowY="auto">
			<Center pt="10px" flexShrink={1} alignItems="flex-start">
				<Latex>{title}</Latex>
			</Center>
			<InputField label="Valor" value={input} onChangeValue={setInput} />
			<InputField label="Base" value={base} onChangeValue={setBase} />
			<FormControl isInvalid={!!error}>
				<Button
					mx="auto"
					my="5px"
					py="5px"
					onClick={() => {
						if (input !== undefined && base) {
							setMath(base_dec_to_n(input, base));
							setError(null);
						} else {
							console.log({ input, base });
							setError(
								callAnjo() +
									', você não setou o Valor/Base direito... Ainda bem que você é bonita né'
							);
							setMath(null);
						}
					}}
				>
					{'Calculate'}
				</Button>
				<FormErrorMessage>{error}</FormErrorMessage>
			</FormControl>
			<Content math={math} />
		</Screen>
	);
};
