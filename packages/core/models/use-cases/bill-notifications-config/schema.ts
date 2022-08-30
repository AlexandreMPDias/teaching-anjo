import { INotificationChannel } from '../notification-channel/schema';

export interface IBillNotificationsConfig extends IBillNotificationsConfig.Front {}

export declare namespace IBillNotificationsConfig {
	export type Frequency = 'weekly' | 'monthly' | 'yearly' | 'aperiodic';

	export interface Common {
		readonly subscription: string;
	}

	export interface Api extends Common {
		readonly channels: readonly INotificationChannel.Api[];
	}

	export interface Front extends Common {
		readonly channels: readonly INotificationChannel[];
	}
}
