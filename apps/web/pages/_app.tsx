// Global Imports
import '../src/config/globals';
import type { AppProps } from 'next/app';

import { StyleProvider } from '@angel-oak/ui/providers/styles';
import { GlobalLoader } from '@angel-oak/ui/providers/global-loader';
import { FontsLoader } from '@angel-oak/ui/providers/font-loader';
import { Page } from '~/components/page';

function Web({ Component, pageProps }: AppProps) {
	const C = Component as any;
	return (
		<StyleProvider>
			<GlobalLoader.Provider>
				<Page>
					<C {...pageProps} />
				</Page>
				<FontsLoader />
			</GlobalLoader.Provider>
		</StyleProvider>
	);
}

export default Web;
