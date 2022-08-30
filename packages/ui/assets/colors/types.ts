import colorsDeclaration from './declaration';

type Colors = typeof colorsDeclaration;
export type ColorKey = keyof Colors;

type PlainKeys = { [K in ColorKey]: Colors[K] extends string ? K : never }[ColorKey];
type ObjectKeys = { [K in ColorKey]: Colors[K] extends object ? K : never }[ColorKey];

type FlattenedKeys<Join extends string> =
	| PlainKeys
	| { [K in ObjectKeys]: `${K}${Join}${Exclude<keyof Colors[K], symbol>}` }[ObjectKeys];

export type Keys = Readonly<Record<FlattenedKeys<'_'>, FlattenedKeys<'.'>>>;
export type All = Readonly<Record<FlattenedKeys<'_'>, string>>;

export type AllFlattenedKeys = FlattenedKeys<'.'>;
