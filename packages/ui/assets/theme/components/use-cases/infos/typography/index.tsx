import makeTypoConfig from './make-typo-config';

const typographyStyleConfig = {
	H1: makeTypoConfig({ family: 'demiBold', size: '26px' }),
	H2: makeTypoConfig({ family: 'demiBold', size: '20px' }),
	H3: makeTypoConfig({ family: 'demiBold', size: '18px' }),
	Title: makeTypoConfig({ family: 'medium', size: '18px' }),
	Paragraph: makeTypoConfig({ family: 'regular', size: '14px' }),
	Small: makeTypoConfig({ family: 'regular', size: '12px' }),
};
export default typographyStyleConfig;
