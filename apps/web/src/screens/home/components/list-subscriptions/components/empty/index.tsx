import { Typo } from '@angel-oak/ui/infos/typography';
import { Box } from '@chakra-ui/react';

export const EmptyListOfSubscriptions = () => {
	return (
		<Box textAlign={'center'} pb="20px">
			<Typo.Title pb="10px">No subscriptions found</Typo.Title>
			<Typo.Paragraph>
				You can click the <Typo.Hightlight>Add Subscription</Typo.Hightlight> button to add
				them
			</Typo.Paragraph>
		</Box>
	);
};
