import type { NextRequest, NextResponse } from 'next/server.js';
import type { NextRouteHandlerContext } from './next-route-handler-context.interface.js';

/**
 * A type for representing a Next.js API route handler function.
 * You can provide a type for the response body (or `never` if there is no response body) and a type for the path parameters object.
 *
 * The default is to allow any response body, and to have no path parameters.
 *
 * @public
 */
export type NextRouteHandler<
	ResponseBody = unknown,
	Context extends NextRouteHandlerContext = NextRouteHandlerContext,
> = NextRouteHandlerContext extends Context
	? (request: NextRequest) => NextResponse<ResponseBody> | PromiseLike<NextResponse<ResponseBody>>
	: (request: NextRequest, context: Context) => NextResponse<ResponseBody> | PromiseLike<NextResponse<ResponseBody>>;
