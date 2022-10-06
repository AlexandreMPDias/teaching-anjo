import {
	Button,
	Center,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	FormErrorMessage,
	FormControl,
	VStack,
} from '@chakra-ui/react';
import { Screen } from '@angel-oak/ui/layouts/screen';
import { useMemo, useState } from 'react';
import { BaseNToDecMagic, base_n_to_dec } from './magic';
import Latex from 'react-latex';
import { callAnjo } from '~/helpers/call-anjo';

const isValidBaseInputPair = (base: number, input: string): string | null => {
	if (!base || !input) {
		return ', você precisa definir tanto a Base quanto o Valor';
	}
	// if (
	// 	input.split('').some((digit) => {
	// 		const value = '0123456789abcdefghijklmnopqrstuvxyz'.indexOf(digit);
	// 		return value === -1 || value >= base;
	// 	})
	// ) {
	// 	return ', parece que alguma coisa deu errado...';
	// }
	return null;
};

const InputField: React.FC<{
	label: string;
	value: string | number;
	onChangeValue(value: any): void;
	text?: boolean;
	error?: string | null;
}> = (props) => {
	return (
		<FormControl isInvalid={!!props.error}>
			<InputGroup mt={'5px'}>
				<InputLeftAddon children={props.label} />
				<Input
					type={'text'}
					value={props.value}
					color="white"
					onChange={(e) => props.onChangeValue(e.target.value)}
				/>
			</InputGroup>
			<FormErrorMessage>{props.error}</FormErrorMessage>
		</FormControl>
	);
};

const Content: React.FC<{ math: BaseNToDecMagic | null }> = ({ math }) => {
	if (!math) return null;

	const { header, result, steps } = math;

	return (
		<VStack gap="5px">
			<Latex>{header}</Latex>
			<Stack>
				{steps.map((step, index) => {
					return (
						<div key={index}>
							<Latex>{step}</Latex>
						</div>
					);
				})}
			</Stack>
			<Latex>{result}</Latex>
		</VStack>
	);
};

export const BaseNToBase10Screen: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [base, setBase] = useState<number>(2);
	const [input, setInput] = useState<string>('');
	const [math, setMath] = useState<BaseNToDecMagic | null>(null);

	const title = useMemo(() => {
		return `$(${input || 'Base'})_{${base}} \\Rightarrow (?)_{10}$`;
	}, [base, input]);

	return (
		<Screen display="flex" flexDirection={'column'} pb="20px">
			<Center pt="10px" flexShrink={1} alignItems="flex-start">
				<Latex>{title}</Latex>
			</Center>
			<InputField label="Base" value={base} onChangeValue={setBase} />
			<InputField label="Valor" value={input} onChangeValue={setInput} error={error} />
			<Button
				mx="auto"
				my="5px"
				py="5px"
				onClick={() => {
					const err = isValidBaseInputPair(base, input);
					if (err) {
						setError(callAnjo({ unpossesive: true }) + err);
						setMath(null);
					} else {
						setError(null);
						setMath(base_n_to_dec(input, base));
					}
				}}
			>
				{'Calculate'}
			</Button>
			<Content math={math} />
		</Screen>
	);
};
