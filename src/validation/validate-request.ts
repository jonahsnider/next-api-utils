import type { NextRequest } from 'next/server.js';
import { z } from 'zod';
import type { NextRouteHandlerSegmentData } from '../server.js';
import type { ParsedRequest, RequestSchemaToParsedRequest } from './interfaces/parsed-request.interface.js';
import type { RequestSchema } from './interfaces/request-schema.interface.js';
import { validateBody } from './validate-body.js';
import { validateParams } from './validate-params.js';
import { validateQuery } from './validate-query.js';

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
 * @returns The validated request body and query
 *
 * @public
 */
export async function validateRequest<T extends RequestSchema<z.Schema, z.Schema, never>>(
	request: NextRequest,
	requestSchema: T,
	// @ts-expect-error
): Promise<RequestSchemaToParsedRequest<T>>;
/**
 * Validate a Next.js API route request with Zod schemas for the query parameters, path parameters, and/or body.
 *
 * @param request - The {@link next/server#NextRequest} object to validate
 * @param segmentData - The {@link NextRouteHandlerSegmentData} object to validate path parameters against
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
export async function validateRequest<T extends RequestSchema<z.Schema, z.Schema, z.Schema>>(
	request: NextRequest,
	segmentData: NextRouteHandlerSegmentData,
	requestSchema: T,
	// @ts-expect-error
): Promise<RequestSchemaToParsedRequest<T>>;
export async function validateRequest<T extends RequestSchema<z.Schema, z.Schema, z.Schema>>(
	request: NextRequest,
	requestSchemaOrContext: T | NextRouteHandlerSegmentData,
	maybeRequestSchema?: T,
): Promise<ParsedRequest<unknown, Record<string, string | string[]>, Record<string, string>>> {
	const requestSchema = maybeRequestSchema ?? (requestSchemaOrContext as T);
	const segmentData = maybeRequestSchema ? (requestSchemaOrContext as NextRouteHandlerSegmentData) : undefined;

	const bodySchema = requestSchema.body ?? z.any();
	const body = await validateBody(request, bodySchema);

	const querySchema = requestSchema.query ?? z.any();
	const query = await validateQuery(request, querySchema);

	if (requestSchema.params) {
		if (!segmentData) {
			throw new TypeError("Can't validate path parameters without a segment data object");
		}

		const paramsSchema = requestSchema.params;
		const params = await validateParams(segmentData, paramsSchema);

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
