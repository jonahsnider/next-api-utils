import type { ParsedUrlQuery } from 'node:querystring';
import type { NextRequest } from 'next/server.js';
import type { Schema, z } from 'zod';
import { InvalidQueryParametersException } from './exceptions/invalid-query-parameters.exception.js';

/** @internal */
export function extractQuery(url: URL): ParsedUrlQuery {
	const query: ParsedUrlQuery = {};

	const searchParams = url.searchParams;

	for (const [key, value] of searchParams.entries()) {
		const currentValue = query[key];
		if (Array.isArray(currentValue)) {
			currentValue.push(value);
		} else if (currentValue) {
			query[key] = [currentValue, value];
		} else {
			query[key] = value;
		}
	}
	return query;
}

/**
 * Validate the query parameters in a request with a Zod schema.
 * Throws an exception if the query parameters do not match the schema.
 * You can use {@link ExceptionWrapper} to automatically catch the exception and send it to the client.
 *
 * @example
 * ```ts
 * import { validateQuery } from 'next-api-utils';
 * import { z } from 'zod';
 *
 * export const GET = (request) => {
 *   const query = validateQuery(request, z.object({ foo: z.string() }));
 * };
 * ```
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
	const query = extractQuery(new URL(request.url));

	const result = schema.safeParse(query);

	if (result.success) {
		return result.data;
	}

	throw new InvalidQueryParametersException(result.error);
}
