import { INotification } from '../../../models/schemas';

export type INotificationCreatePayload = Omit<INotification.Create, never>;

export type INotificationListPayload = {
	readonly billSubscriptionUuid?: string;
	readonly day?: number;
	readonly month?: number;
	readonly year?: number;
};
