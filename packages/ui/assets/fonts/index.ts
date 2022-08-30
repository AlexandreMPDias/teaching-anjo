const FontNameMap: Record<Fonts, string> = {
	regular: 'avenirRegular',
	heavy: 'avenirHeavy',
	light: 'avenirUltraLight',
	medium: 'avenirMedium',
	bold: 'avenirBold',
	demiBold: 'avenirDemiBold',
};

type GetFontFamily = {
	(fontFamily: undefined): undefined;
	(fontFamily: Fonts): string;
	(fontFamily: Fonts | undefined): string | undefined;
};
const getFontFamilyName: GetFontFamily = ((fontFamily: Fonts | undefined): string | undefined => {
	return fontFamily ? FontNameMap[fontFamily] : undefined;
}) as any;

export const Fonts = {
	get: getFontFamilyName,
	nameMap: FontNameMap,
};

export type Fonts = Fonts.Family;

export declare namespace Fonts {
	export type Family = Avenir;

	export type Avenir = 'regular' | 'heavy' | 'light' | 'medium' | 'bold' | 'demiBold';
}
