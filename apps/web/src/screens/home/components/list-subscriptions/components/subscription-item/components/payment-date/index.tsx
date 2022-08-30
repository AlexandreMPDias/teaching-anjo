import { useMemo, memo } from 'react';
import { IBillSubscription } from '@angel-oak/core/models/schemas';
import { DateService } from '@angel-oak/utils/date';
import { Typo } from '@angel-oak/ui/infos/typography';
import formatDistance from 'date-fns/formatDistance';
import { Datum } from '@angel-oak/utils/date/datum';
import { BillSubscription } from '@angel-oak/core/models/use-cases/bill-subscription';

const PaymentContent: React.FC<{ next: Datum }> = memo(({ next }) => {
	const today = DateService.today();

	const distance = useMemo(() => {
		const distanceInDays = Math.abs(DateService.diff.days(today, next));
		if (distanceInDays <= 1) return 'Today';
		return formatDistance(next, today, {
			includeSeconds: false,
			addSuffix: true,
		});
	}, [next]);

	const At = () => {
		if (DateService.is(next).before(today)) return null;
		return (
			<Typo.Small>
				{' at '}
				<Typo.Hightlight>{DateService.format.date.human(next)}</Typo.Hightlight>
			</Typo.Small>
		);
	};

	return (
		<>
			<Typo.Paragraph>
				Next Payment: <Typo.Hightlight>{distance}</Typo.Hightlight>
			</Typo.Paragraph>
			<At />
		</>
	);
});

export const PaymentDate: React.FC<{ subscription: IBillSubscription }> = ({ subscription }) => {
	if (!subscription.payment.next) return null;
	return <PaymentContent next={subscription.payment.next} />;
};
