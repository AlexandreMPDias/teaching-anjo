import next from './use-cases/next';
import node from './use-cases/node';

const presets = {
	next,
	node,
};

export type TestPreset = keyof typeof presets;

export default presets;
