import { useCallback } from 'react';

type Serializer<V> = (item: V) => string;

export const useSerializerCallback = <V>(serializer: Serializer<V> | undefined) => {
	type ParsedCallback = {
		(item: V): string;
		(item: V | undefined): string | null;
	};

	const parsed: ParsedCallback = useCallback(
		(item: V | undefined) => {
			if (!item) return null as any;
			if (serializer) return serializer(item);
			return String(item);
		},
		[serializer]
	);

	return parsed;
};
