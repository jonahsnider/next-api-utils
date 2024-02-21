import type { NextResponse } from 'next/server.js';
import { TO_RESPONSE } from '../constants.js';
import type { NextRouteHandler } from '../interfaces/next-route-handler.interface.js';
import type { NextRouteHandlerContext } from '../server.js';
import { BaseValidationException } from '../validation/exceptions/base-validation.exception.js';

/**
 * A base interface for representing known application exceptions which should be sent to the client when thrown.
 *
 * @public
 */
export type BaseException<T = unknown> = {
	/** A function that converts this exception to a {@link next/server#NextResponse} containing information about the exception. */
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
 * Automatically catches {@link BaseValidationException} exceptions from {@link validateQuery}, {@link validateParams}, and {@link validateBody}.
 *
 * @example
 * ```ts
 * // exception-route-wrapper.ts
 *
 * import { ExceptionWrapper } from 'next-api-utils';
 * import { CustomException } from './custom-exception';
 *
 * function isException(maybeException: unknown): maybeException is CustomException {
 *   return maybeException instanceof CustomException;
 * }
 *
 * export const exceptionRouteWrapper = new ExceptionWrapper(isException);
 * ```
 *
 * ```ts
 * // route.ts
 *
 * import { NextResponse } from 'next/server';
 * import { exceptionRouteWrapper } from './exception-route-wrapper';
 * import { MyResponseSchema } from './my-response-schema';
 *
 * export const GET = exceptionRouteWrapper.wrapRoute<MyResponseSchema>(() => {
 *   return NextResponse.json({ foo: 'hello world' });
 * });
 * ```
 *
 * @public
 */
export class ExceptionWrapper<Exception extends BaseException<unknown>> {
	/**
	 *
	 * @param isException - A function that returns whether `error` is a known application exception that should be sent to the client when thrown. If not provided, only {@link BaseValidationException} exceptions will be caught.
	 */
	constructor(private readonly isException?: IsException<Exception>) {}

	/**
	 * Wrap a route handler to catch known exceptions and send them to the client.
	 *
	 * If an exception is encountered that does not match the {@link ExceptionWrapper#isException} function, it will be rethrown.
	 *
	 * @param route - The route handler function to wrap
	 * @returns A wrapped version of the route handler
	 */
	wrapRoute<ResponseBody, Context extends NextRouteHandlerContext = NextRouteHandlerContext>(
		route: NextRouteHandler<ResponseBody, Context>,
	) {
		return async (...parameters: Parameters<NextRouteHandler<ResponseBody, Context>>) => {
			try {
				// @ts-expect-error The arguments to route will be correct at runtime
				return await route.apply(route, parameters);
			} catch (error) {
				if (this.isException?.(error) || error instanceof BaseValidationException) {
					return error[TO_RESPONSE]();
				}

				throw error;
			}
		};
	}
}
