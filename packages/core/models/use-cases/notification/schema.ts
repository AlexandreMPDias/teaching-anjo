import { Datum } from '@angel-oak/utils/date/datum';
import { IDateTime } from '../../etc/date-time/schema';
import { INotificationChannel } from '../notification-channel/schema';

export type INotification = INotification.INotification;

export declare namespace INotification {
	export interface Common {}

	export interface Api extends Common {
		readonly date: IDateTime.Date;
		readonly channel: INotificationChannel.Api;
	}

	export interface INotification extends Common {
		readonly date: Datum;
		readonly channel: INotificationChannel;
	}

	export type Create = {
		readonly date: Datum;
		readonly channel: INotificationChannel;
	};
}
