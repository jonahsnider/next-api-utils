import querystring from 'node:querystring';
import type { NextRequest } from 'next/server.js';
import type { Schema, z } from 'zod';
import { InvalidBodyException } from './exceptions/invalid-body.exception.js';
import { InvalidPathParametersException } from './exceptions/invalid-path-parameters.exception.js';
import { InvalidQueryParametersException } from './exceptions/invalid-query-parameters.exception.js';
import type { NextRouteHandlerContext } from './interfaces/next-route-handler.interface.js';

/**
 * Validate the query parameters in a request with a Zod schema.
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result.data;
	}

	throw new InvalidQueryParametersException(result.error);
}

/**
 * Validate the path parameters in a request with a Zod schema.
 * @param context - The {@link NextRouteHandlerContext} object to validate the path parameters for
 * @param schema - The Zod schema to validate the path parameters against
 * @returns The validated path parameters
 *
 * @throws {@link InvalidPathParametersException}
 * Thrown if the path parameters failed validation
 *
 * @public
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export function validateParams<T extends Schema>(context: NextRouteHandlerContext, schema: T): z.infer<T> {
	const result = schema.safeParse(context.params);

	if (result.success) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result.data;
	}

	throw new InvalidPathParametersException(result.error);
}

/**
 * Validate the body in a request with a Zod schema.
 * @param request - The {@link next/server#NextRequest} object to validate the body for
 * @param schema - The Zod schema to validate the body against
 * @returns The validated body
 *
 * @throws {@link InvalidBodyException}
 * Thrown if the body failed validation
 *
 * @public
 */
export async function validateBody<T extends Schema>(
	request: Pick<NextRequest, 'json'>,
	schema: T,
): Promise<z.infer<T>> {
	const body: unknown = await request.json();

	const result = schema.safeParse(body);

	if (result.success) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result.data;
	}

	throw new InvalidBodyException(result.error);
}
