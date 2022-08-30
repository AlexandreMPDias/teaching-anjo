import { DefaultNotificationFactory, Model, DefaultNotificationRule } from './factory';

export const getDefaultRules = (model: Model): readonly DefaultNotificationRule[] => {
	const factory = new DefaultNotificationFactory(model);

	const close1 = factory.compose(1);

	return [close1];
};
