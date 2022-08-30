export type StyleUnit = 'px' | 'rem' | 'pt' | '%' | 'em' | 'cm' | 'ex' | 'in' | 'mm' | 'pc';
export type ParsedStyleMeasure = `${number}${StyleUnit}`;
export type StyleMeasure = number | ParsedStyleMeasure;

const parseMeasure = (value: StyleMeasure, defaultUnit: StyleUnit = 'px'): ParsedStyleMeasure => {
	if (typeof value === 'number') {
		return `${value}${defaultUnit}`;
	}
	return value;
};

export const measure = {
	parse: parseMeasure,
};
