import { makeWithInitMany } from '../../helpers/make-init-many';
import { INotificationChannel } from './schema';
import * as statics from './statics';

const inits = makeWithInitMany((channel: INotificationChannel.Api): INotificationChannel => {
	return channel;
});

export const NotificationChannel = {
	...inits,
	create: (channel: INotificationChannel): INotificationChannel.Api => {
		return channel;
	},
	compose: statics.makeComposer(inits.init.one),
};
