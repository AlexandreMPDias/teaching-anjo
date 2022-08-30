import queryParserRecursivelyHelper from './queryParserRecursivelyHelper';

/**
 * Parses the query object to a queryString supported by api
 *
 * it should be called when using query parameters that have nested objects
 *
 * @param {Record<string, any>} query
 *
 * @return {string} queryString
 */
const queryParser = (query: Record<string, any>): string => {
	let queryString = '';

	Object.entries(query).forEach(([key, value]) => {
		if (typeof value !== 'object') {
			queryString = queryString.concat(`${key}=${value}&`);
		} else {
			queryString = queryParserRecursivelyHelper(value, key, queryString);
		}
	});

	if (queryString.length > 0) {
		queryString = queryString.slice(0, -1);
	}

	return queryString;
};

export default queryParser;
