import { INotificationChannel } from '../../schema';

type InitFn = (channel: INotificationChannel.Api) => INotificationChannel;

export const makeComposer = (init: InitFn) => {
	return {
		alexa: () => init({ type: 'alexa' }),
		email: (address: string) => init({ type: 'email', address }),
	};
};
