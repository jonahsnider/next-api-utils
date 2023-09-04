import type { NextRequest } from 'next/server.js';
import type { Schema, z } from 'zod';
import { InvalidBodyException } from './exceptions/invalid-body.exception.js';

/**
 * Validate the body in a request with a Zod schema.
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
	const body: unknown = await request.json();

	const result = schema.safeParse(body);

	if (result.success) {
		return result.data;
	}

	throw new InvalidBodyException(result.error);
}
