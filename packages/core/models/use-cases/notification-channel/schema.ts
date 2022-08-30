export type INotificationChannel = INotificationChannel.Front;

export declare namespace INotificationChannel {
	type Channels = [
		{
			type: 'alexa';
		},
		{
			type: 'email';
			address: string;
		}
	];

	export interface Common {}

	export type Api = Common & Channels[number];

	export type Front = Common & Channels[number];
}
