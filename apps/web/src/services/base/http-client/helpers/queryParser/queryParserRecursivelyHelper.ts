/**
 * Recursively parses nested objects concatanating to queryString
 *
 * @param {Record<string, any>} obj
 * @param {string} basePath
 * @param {string} queryString
 *
 * @return {string} queryString
 */
const queryParserRecursivelyHelper = (
	obj: Record<string, any>,
	basePath: string,
	queryString: string
): string => {
	Object.entries(obj).forEach(([key, value]) => {
		const keyBasePath = `${basePath}[${key}]`;

		if (typeof value !== 'object') {
			queryString = queryString.concat(`${keyBasePath}=${value}&`);
		} else {
			queryString = queryParserRecursivelyHelper(value, keyBasePath, queryString);
		}
	});

	return queryString;
};

export default queryParserRecursivelyHelper;
