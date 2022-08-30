import { IBillSubscription } from '../../../models/schemas';

export type IBillSubscriptionCreatePayload = Omit<IBillSubscription.Create, 'id' | 'uuid'>;

export type IBillSubscriptionListPayload = {};

export type IBillSubscriptionUpdatetPayload = Partial<Omit<IBillSubscription.Api, 'id' | 'uuid'>>;
