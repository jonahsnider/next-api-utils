/**
 * The context object passed to a Next.js API route handler as the second parameter.
 *
 * @public
 */
export type NextRouteHandlerContext<PathParameters extends Record<string, string> = Record<never, never>> = {
	params: PathParameters;
};
