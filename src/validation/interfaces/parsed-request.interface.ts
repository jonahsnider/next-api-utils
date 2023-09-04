import { z } from 'zod';
import { RequestSchema } from './request-schema.interface.js';

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
	// @ts-expect-error
	z.infer<T['body']>,
	// @ts-expect-error
	z.infer<T['query']>,
	// @ts-expect-error
	z.infer<T['params']>
>;
