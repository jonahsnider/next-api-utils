import { NextRequest } from 'next/server.js';
import { RequestSchema } from './interfaces/request-schema.interface.js';
import { z } from 'zod';
import { validateBody } from './validate-body.js';
import { validateQuery } from './validate-query.js';
import { validateParams } from './validate-params.js';
import { NextRouteHandlerContext } from '../index.js';
import { ParsedRequest, RequestSchemaToParsedRequest } from './interfaces/parsed-request.interface.js';

/**
 * Validate a Next.js API route request with Zod schemas for the query parameters and/or body.
 *
 * @param request - The {@link next/server#NextRequest} object to validate
 * @param requestSchema - The schema to validate the request against
 *
 * @throws {@link InvalidBodyException}
 * Thrown if the body failed validation
 *
 * @throws {@link InvalidQueryParametersException}
 * Thrown if the query parameters failed validation
 *
 * @throws {@link InvalidPathParametersException}
 * Thrown if the path parameters failed validation
 *
 * @returns The validated request body and query
 *
 * @public
 */
export async function validateRequest<T extends RequestSchema & { params?: undefined }>(
	request: NextRequest,
	requestSchema: T,
): Promise<RequestSchemaToParsedRequest<T>>;
export async function validateRequest<T extends RequestSchema>(
	request: NextRequest,
	context: NextRouteHandlerContext,
	requestSchema: T,
): Promise<RequestSchemaToParsedRequest<T>>;
export async function validateRequest<T extends RequestSchema>(
	request: NextRequest,
	requestSchemaOrContext: T | NextRouteHandlerContext,
	maybeRequestSchema?: T,
	// rome-ignore lint/suspicious/noExplicitAny: The types for this will never compile since it's too generic
): Promise<ParsedRequest<any, any, any>> {
	const requestSchema = maybeRequestSchema ?? (requestSchemaOrContext as T);
	const context = maybeRequestSchema ? (requestSchemaOrContext as NextRouteHandlerContext) : undefined;

	const bodySchema = requestSchema.body ?? z.any();
	const body = await validateBody(request, bodySchema);

	const querySchema = requestSchema.query ?? z.any();
	const query = await validateQuery(request, querySchema);

	if (requestSchema.params) {
		if (!context) {
			throw new TypeError("Can't validate path parameters without a context object");
		}

		const paramsSchema = requestSchema.params;
		const params = validateParams(context, paramsSchema);

		return {
			body,
			query,
			params,
		};
	}

	return {
		body,
		query,
		params: undefined,
	};
}
