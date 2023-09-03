import { Http } from '@jonahsnider/util';
import { type z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { type validateBody } from '../validate-request.js';
import { BaseHttpException } from './base.exception.js';
import { ExceptionCode } from './enums/exceptions.enum.js';

/**
 * An exception that is thrown when {@link validateBody} fails.
 *
 * @public
 */
export class InvalidBodyException extends BaseHttpException {
	constructor(zodError: z.ZodError<unknown>) {
		super(fromZodError(zodError).message, Http.Status.UnprocessableEntity, ExceptionCode.InvalidPathParameters);
	}
}
