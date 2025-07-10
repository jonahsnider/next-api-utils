import type { z } from 'zod';
import type { RequestSchema } from './request-schema.interface.js';

/**
 * Representing a parsed request from validateRequest.
 *
 * @public
 */
export type ParsedRequest<
	RequestBody = never,
	QueryParameters extends undefined | Record<string, unknown> = never,
	PathParameters extends undefined | Record<string, string | string[]> = never,
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
	z.infer<T['body']>,
	z.infer<T['query']>,
	z.infer<T['params']>
>;
