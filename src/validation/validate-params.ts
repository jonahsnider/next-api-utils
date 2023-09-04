import type { Schema, z } from 'zod';
import type { NextRouteHandlerContext } from '../interfaces/next-route-handler-context.interface.js';
import { InvalidPathParametersException } from './exceptions/invalid-path-parameters.exception.js';

/**
 * Validate the path parameters in a request with a Zod schema.
 *
 * @param context - The {@link NextRouteHandlerContext} object to validate the path parameters for
 * @param schema - The Zod schema to validate the path parameters against
 * @returns The validated path parameters
 *
 * @throws {@link InvalidPathParametersException}
 * Thrown if the path parameters failed validation
 *
 * @public
 */
export function validateParams<T extends Schema>(context: NextRouteHandlerContext, schema: T): z.infer<T> {
	const result = schema.safeParse(context.params);

	if (result.success) {
		return result.data;
	}

	throw new InvalidPathParametersException(result.error);
}
