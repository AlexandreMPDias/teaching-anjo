import { Box, useStyleConfig, BoxProps } from '@chakra-ui/react';
import CardContent from '../../use-content';

export interface CardProps extends BoxProps {
	loading?: boolean;
	error?: boolean | string | null;
}

const useClickable = (props: CardProps) => {
	if (props.onClick) {
		return {
			cursor: 'pointer',
		};
	}
	return {};
};

export const BasicCard: React.FC<CardProps> = (props) => {
	const { variant, children, loading, error, ...rest } = props as any;

	const styles = useStyleConfig('Card', { variant });

	const clickableStyles = useClickable(props);

	return (
		<Box {...clickableStyles} __css={styles} {...rest}>
			<CardContent loading={loading} error={error} children={children} />
		</Box>
	);
};
