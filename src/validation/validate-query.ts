import querystring from 'querystring';
import type { NextRequest } from 'next/server.js';
import type { Schema, z } from 'zod';
import { InvalidQueryParametersException } from './exceptions/invalid-query-parameters.exception.js';

/**
 * Validate the query parameters in a request with a Zod schema.
 *
 * @param request - The {@link next/server#NextRequest} object to validate the query parameters for
 * @param schema - The Zod schema to validate the query parameters against
 * @returns The validated query parameters
 *
 * @throws {@link InvalidQueryParametersException}
 * Thrown if the query parameters failed validation
 *
 * @public
 */
export function validateQuery<T extends Schema>(request: Pick<NextRequest, 'url'>, schema: T): z.infer<T> {
	const query = querystring.parse(new URL(request.url).search.slice('?'.length));

	const result = schema.safeParse(query);

	if (result.success) {
		return result.data;
	}

	throw new InvalidQueryParametersException(result.error);
}
