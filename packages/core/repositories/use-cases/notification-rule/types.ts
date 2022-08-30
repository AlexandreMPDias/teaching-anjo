import { INotificationRule } from '../../../models/schemas';

export type INotificationCreatePayload = Omit<INotificationRule.Create, never>;
