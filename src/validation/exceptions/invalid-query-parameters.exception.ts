import { Http } from '@jonahsnider/util';
import type { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ExceptionCode } from '../enums/exceptions.enum.js';
import { BaseValidationException } from './base-validation.exception.js';

/**
 * An exception that is thrown when {@link validateQuery} fails.
 *
 * @public
 */
export class InvalidQueryParametersException extends BaseValidationException {
	constructor(zodError: z.ZodError<unknown>) {
		super(fromZodError(zodError).message, Http.Status.UnprocessableEntity, ExceptionCode.InvalidQueryParameters);
	}
}
