import { z } from 'zod';
import { RequestSchema } from './request-schema.interface.js';

export type ParsedRequest<
	RequestBody = undefined,
	QueryParameters extends undefined | Record<string, unknown> = undefined,
	PathParameters extends undefined | Record<string, string | string[]> = undefined,
> = {
	body?: RequestBody;
	query?: QueryParameters;
	params?: PathParameters;
};

export type RequestSchemaToParsedRequest<T extends RequestSchema> = ParsedRequest<
	// @ts-expect-error
	z.infer<T['body']>,
	// @ts-expect-error
	z.infer<T['query']>,
	// @ts-expect-error
	z.infer<T['params']>
>;
