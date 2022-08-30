export declare namespace Content {
	export type Error = string | null | boolean | undefined;

	export type Loading = boolean | undefined;

	export interface CommonProps {
		children: React.ReactNode;
	}
}

declare namespace ContentTypesUtils {
	export type MakePureProps<T> = Omit<T, keyof Content.CommonProps>;
}

export default ContentTypesUtils;
