import type { NextResponse } from 'next/server.js';
import { TO_RESPONSE } from './constants.js';
import { BaseHttpException } from './exceptions/base.exception.js';
import type { NextRouteHandler } from './interfaces/next-route-handler.interface.js';

/**
 * A base interface for representing known application exceptions which should be sent to the client when thrown.
 *
 * @public
 */
export type BaseException<T> = {
	/** A function that converts this exception to a {@link NextResponse} containing information about the exception. */
	[TO_RESPONSE]: () => NextResponse<T>;
};

/**
 * @returns Whether `error` is a known application exception that should be sent to the client when thrown.
 *
 * @public
 */
export type IsException<Exception extends BaseException<unknown>> = (error: unknown) => error is Exception;

/**
 * A class for wrapping Next.js API route handlers to catch known application exceptions which should be sent to the client when thrown.
 *
 * @public
 */
export class ExceptionWrapper<Exception extends BaseException<unknown>> {
	constructor(private readonly isException: IsException<Exception>) {}

	/**
	 * Wrap a route handler to catch known exceptions and send them to the client.
	 *
	 * @param route - The route handler function to wrap
	 * @returns A wrapped version of the route handler
	 */
	async wrapRoute<Route extends NextRouteHandler<Exception>>(route: Route) {
		return async (...parameters: Parameters<Route>) => {
			try {
				return await route.apply(route, parameters);
			} catch (error) {
				if (this.isException(error) || error instanceof BaseHttpException) {
					return error[TO_RESPONSE]();
				}

				throw error;
			}
		};
	}
}
