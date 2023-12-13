import { Http } from '@jonahsnider/util';
import type { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
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
			typeof error === 'string' ? error : fromZodError(error).message,
			Http.Status.UnprocessableEntity,
			ExceptionCode.InvalidBody,
		);
	}
}
