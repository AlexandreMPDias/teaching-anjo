import { JestConfigBuilder } from '@angel-oak/jest-config';

const config = new JestConfigBuilder();

config.preset('node').config({});
config.onScopes({});

export default config.parse();
