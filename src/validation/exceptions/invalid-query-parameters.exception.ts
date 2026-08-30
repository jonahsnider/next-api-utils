import { Http } from '@jonahsnider/util';
import { z } from 'zod';
import { ExceptionCode } from '../enums/exceptions.enum.ts';
import { BaseValidationException } from './base-validation.exception.ts';

/**
 * An exception that is thrown when {@link validateQuery} fails.
 *
 * @public
 */
export class InvalidQueryParametersException extends BaseValidationException {
	constructor(zodError: z.ZodError<unknown>) {
		super(z.prettifyError(zodError), Http.Status.UnprocessableEntity, ExceptionCode.InvalidQueryParameters);
	}
}
