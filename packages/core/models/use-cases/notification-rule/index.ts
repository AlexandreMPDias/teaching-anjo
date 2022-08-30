import { makeWithInitMany } from '../../helpers/make-init-many';
import { INotificationRule } from './schema';
import { NotificationChannel } from '../notification-channel';
import { IBillSubscription } from '../bill-subscription/schema';
import { Datum } from '@angel-oak/utils/date/datum';
import { DateService } from '@angel-oak/utils/date';
import * as statics from './statics';

export const NotificationRule = {
	...makeWithInitMany((rule: INotificationRule.Api): INotificationRule => {
		const { channels, triggerTimeDifference, triggerUnit, subscription } = rule;

		return {
			trigger: {
				timeDifference: triggerTimeDifference,
				unit: triggerUnit,
			},
			channels: NotificationChannel.init.many(channels),
			subscription,
		};
	}),
	getTriggeredAt: (rule: INotificationRule, bill: IBillSubscription): Datum => {
		const { trigger } = rule;
		const { unit, timeDifference } = trigger;
		const { payment } = bill;

		const nextPaymentDate = payment.next!;
		return DateService.add[unit](nextPaymentDate, -timeDifference);
	},
	create: (rule: INotificationRule.Create): INotificationRule.Api => {
		const { channels, trigger, subscription } = rule;

		return {
			channels: channels.map(NotificationChannel.create),
			triggerTimeDifference: trigger.timeDifference,
			triggerUnit: trigger.unit,
			subscription: subscription.uuid,
		};
	},
	...statics,
};
