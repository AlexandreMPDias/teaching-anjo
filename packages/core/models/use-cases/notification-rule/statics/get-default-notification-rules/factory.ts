import { NotificationChannel as Channel } from '../../../notification-channel';
import { IBillSubscription, INotificationChannel } from '../../../schemas';
import { INotificationRule as IRule } from '../../schema';

export type DefaultNotificationRule = Omit<IRule.Create, 'subscription'>;

export type Model = {
	frequency: IBillSubscription.Frequency;
	email?: string;
};

const makeChannels = (email: string | undefined): readonly INotificationChannel[] => {
	const channels = [Channel.compose.alexa()];
	if (email) channels.push(Channel.compose.email(email));
	return channels;
};

const frequencyToTriggerUnitMap: Record<IBillSubscription.Frequency, IRule.TriggerUnit> = {
	aperiodic: 'days',
	weekly: 'days',
	monthly: 'weeks',
	yearly: 'months',
};

export class DefaultNotificationFactory {
	private readonly channels: readonly INotificationChannel[];
	constructor(private readonly model: Model) {
		this.channels = makeChannels(model.email);
	}

	get unit() {
		return frequencyToTriggerUnitMap[this.model.frequency];
	}

	compose = (difference: number): DefaultNotificationRule => {
		return {
			channels: this.channels,
			trigger: {
				timeDifference: difference,
				unit: this.unit,
			},
		};
	};
}
