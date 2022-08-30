const dotenv = require('dotenv');
const transpile = require('next-transpile-modules');

dotenv.config();

/**
 * @type {(next: Exclude<import('next').NextConfig, undefined>) => any}
 */
const withTM = transpile([
	'@angel-oak/ui',
	'@angel-oak/poseidon',
	'@angel-oak/core',
	'@angel-oak/utils',
]);

const pickEnv = (...keys) => {
	const env = {};
	keys.forEach((key) => (env[key] = process.env[key]));
	return env;
};

module.exports = withTM({
	reactStrictMode: true,
	env: pickEnv('ALEXA_NOTIFY_ME_ACCESS_CODE'),
});
