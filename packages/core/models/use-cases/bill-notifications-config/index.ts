import { NotificationChannel } from '../notification-channel';
import { IBillNotificationsConfig } from './schema';

export const BillNotificationsConfig = {
	init: (config: IBillNotificationsConfig.Api): IBillNotificationsConfig => {
		return {
			...config,
			channels: NotificationChannel.init.many(config.channels),
		};
	},
};
