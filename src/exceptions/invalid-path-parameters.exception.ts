import { Http } from '@jonahsnider/util';
import type { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import type { validateParams } from '../validate-request.js';
import { BaseHttpException } from './base.exception.js';
import { ExceptionCode } from './enums/exceptions.enum.js';

/**
 * An exception that is thrown when {@link validateParams} fails.
 *
 * @public
 */
export class InvalidPathParametersException extends BaseHttpException {
	constructor(zodError: z.ZodError<unknown>) {
		super(fromZodError(zodError).message, Http.Status.UnprocessableEntity, ExceptionCode.InvalidPathParameters);
	}
}
