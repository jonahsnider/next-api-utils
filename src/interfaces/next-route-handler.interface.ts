import type { NextRequest, NextResponse } from 'next/server.js';

/**
 * The context object passed to a Next.js API route handler as the second parameter.
 *
 * @public
 */
export type NextRouteHandlerContext<PathParameters extends Record<string, string> = Record<never, never>> = {
	params: PathParameters;
};

/**
 * A type for representing a Next.js API route handler function.
 * You can provide a type for the response body (or `never` if there is no response body) and a type for the path parameters object.
 *
 * The default is to allow any response body, and to have no path parameters.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type NextRouteHandler<
	ResponseBody = object,
	Context extends NextRouteHandlerContext = NextRouteHandlerContext,
> = (request: NextRequest, context: Context) => NextResponse<ResponseBody> | PromiseLike<NextResponse<ResponseBody>>;
