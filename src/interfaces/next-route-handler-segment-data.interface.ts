/**
 * The segment data object passed to a Next.js API route handler as the second parameter.
 *
 * @public
 */
export type NextRouteHandlerSegmentData<PathParameters extends Record<string, string> = Record<never, never>> = {
	params: Promise<PathParameters>;
};
