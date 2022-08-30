import { INotificationChannel } from '../notification-channel/schema';
import { IBillSubscription } from '../schemas';

export type INotificationRule = INotificationRule.INotificationRule;

export declare namespace INotificationRule {
	export type TriggerUnit = 'days' | 'months' | 'weeks';

	export type Trigger = {
		readonly timeDifference: number;
		readonly unit: TriggerUnit;
	};

	export interface Common {
		readonly subscription: string;
	}

	export interface Api extends Common {
		readonly triggerTimeDifference: number;
		readonly triggerUnit: TriggerUnit;
		readonly channels: readonly INotificationChannel.Api[];
	}

	export interface INotificationRule extends Common {
		readonly channels: readonly INotificationChannel[];
		readonly trigger: Trigger;
	}

	export type Create = {
		readonly subscription: IBillSubscription;
		readonly channels: readonly INotificationChannel[];
		readonly trigger: Trigger;
	};
}
