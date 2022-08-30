import { useMemo } from 'react';
import { Content } from '../../content-types';
import { Flex } from '@chakra-ui/react';
import { Typo } from '../../../../infos/typography';

export interface IErrorContentProps extends Content.CommonProps {
	error: Content.Error;
}

export default (props: IErrorContentProps) => {
	const errorMessage = useMemo((): string | null => {
		if (props.error) {
			if (typeof props.error === 'string') {
				return props.error;
			}
			return '';
		}
		return null;
	}, [props.error]);

	if (errorMessage === null) return <>{props.children}</>;

	return (
		<Flex
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			maxW="350px"
			margin="auto"
			textAlign="center"
			gridGap="20px"
		>
			{/* <Image height="230px" src={FixIssue.src} /> */}
			<Typo.Title color="primary.400">{'Oops! Alguma coisa deu errado.'}</Typo.Title>
			<Typo.Paragraph color="neutral.700">{errorMessage}</Typo.Paragraph>
		</Flex>
	);
};
