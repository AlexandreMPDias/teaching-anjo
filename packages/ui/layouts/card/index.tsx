import { Box, useStyleConfig, BoxProps } from '@chakra-ui/react';
import { AnyContent } from '../content';

export interface CardProps extends BoxProps {
	loading?: boolean;
	error?: boolean | string | null;
	variant?: 'rounded' | 'smooth';
}

const useClickable = (props: CardProps) => {
	if (props.onClick) {
		return {
			cursor: 'pointer',
		};
	}
	return {};
};

export const Card: React.FC<CardProps> = (props) => {
	const { variant, children, loading, error, ...rest } = props;

	const styles = useStyleConfig('Card', { variant });

	const clickableStyles = useClickable(props);

	return (
		<Box {...clickableStyles} __css={styles} {...rest}>
			<AnyContent loading={loading} error={error}>
				{children}
			</AnyContent>
		</Box>
	);
};
