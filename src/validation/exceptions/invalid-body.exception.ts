import { Http } from '@jonahsnider/util';
import { z } from 'zod';
import { ExceptionCode } from '../enums/exceptions.enum.js';
import { BaseValidationException } from './base-validation.exception.js';

/**
 * An exception that is thrown when {@link validateBody} fails.
 *
 * @public
 */
export class InvalidBodyException extends BaseValidationException {
	constructor(error: z.ZodError<unknown> | string) {
		super(
			typeof error === 'string' ? error : z.prettifyError(error),
			Http.Status.UnprocessableEntity,
			ExceptionCode.InvalidBody,
		);
	}
}
