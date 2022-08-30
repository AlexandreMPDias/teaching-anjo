import { IBill } from '../../../models/schemas';

export type IBillCreatePayload = Omit<IBill.Create, 'id' | 'uuid' | 'subscription'>;

export type IBillUpdatetPayload = Partial<Omit<IBill.Api, 'id' | 'uuid'>>;
