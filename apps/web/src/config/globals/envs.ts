import { setupEnv } from '@angel-oak/utils/env';

setupEnv({
	env: process.env.NODE_ENV as any,
	notification: {
		alexa: {
			notifyMeAccessCode: process.env.ALEXA_NOTIFY_ME_ACCESS_CODE,
		},
	},
});
