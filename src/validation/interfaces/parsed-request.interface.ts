import type { z } from 'zod';
import type { RequestSchema } from './request-schema.interface.js';

/**
 * Representing a parsed request from validateRequest.
 *
 * @public
 */
export type ParsedRequest<
	RequestBody = never,
	QueryParameters = never,
	PathParameters = never,
> = {
	body: never extends RequestBody ? undefined : RequestBody;
	query: never extends QueryParameters ? undefined : QueryParameters;
	params: never extends PathParameters ? undefined : PathParameters;
};

/**
 * Convert a {@link RequestSchema} to a {@link ParsedRequest}.
 *
 * @public
 */
export type RequestSchemaToParsedRequest<T extends RequestSchema> = ParsedRequest<
	T['body'] extends z.ZodType ? z.infer<T['body']> : never,
	T['query'] extends z.ZodType ? z.infer<T['query']> : never,
	T['params'] extends z.ZodType ? z.infer<T['params']> : never
>;
