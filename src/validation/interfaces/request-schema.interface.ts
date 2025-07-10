import type { z } from 'zod';

/**
 * An object with Zod schemas for validating a request body, query parameters, and/or path parameters with validateRequest.
 *
 * @public
 */
export type RequestSchema<
	RequestBody extends z.ZodType | undefined = never,
	QueryParameters extends z.ZodType | undefined = never,
	PathParameters extends z.ZodType | undefined = never,
> = {
	body: never extends RequestBody ? undefined : RequestBody;
	query: never extends QueryParameters ? undefined : QueryParameters;
	params: never extends PathParameters ? undefined : PathParameters;
};
