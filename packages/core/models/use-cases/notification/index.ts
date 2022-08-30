import { DateTime } from '../../schemas';
import { NotificationChannel } from '../notification-channel';
import { INotification } from './schema';

export const Notification = {
	init: (notification: INotification.Api): INotification => {
		return {
			...notification,
			date: DateTime.init.date(notification.date),
			channel: NotificationChannel.init.one(notification.channel),
		};
	},
	create: (notification: INotification.Create): INotification.Api => {
		const { date, channel } = notification;
		return {
			date: DateTime.serialize.date(date),
			channel: NotificationChannel.create(channel),
		};
	},
};
