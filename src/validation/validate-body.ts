import type { NextRequest } from 'next/server.js';
import type { Schema, z } from 'zod';
import { InvalidBodyException } from './exceptions/invalid-body.exception.js';

/**
 * Validate the body in a request with a Zod schema.
 * Throws an exception if the body does not match the schema.
 * You can use {@link ExceptionWrapper} to automatically catch the exception and send it to the client.
 *
 * @example
 * ```ts
 * import { validateBody } from 'next-api-utils';
 * import { z } from 'zod';
 *
 * export const POST = (request) => {
 *   const body = validateBody(request, z.object({ foo: z.string() }));
 * };
 * ```
 *
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
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		throw new InvalidBodyException('Request body is not JSON');
	}

	const result = schema.safeParse(body);

	if (result.success) {
		return result.data;
	}

	throw new InvalidBodyException(result.error);
}
