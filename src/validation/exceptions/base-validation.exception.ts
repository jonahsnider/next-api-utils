import { NextResponse } from 'next/server.js';
import { TO_RESPONSE } from '../../constants.js';
import type { ValidationExceptionSchema } from '../dtos/exception.dto.js';
import type { ExceptionCode } from '../enums/exceptions.enum.js';
import { Http } from '@jonahsnider/util';

/**
 * The base class that exceptions thrown during validation inherit from.
 *
 * @public
 */
export class BaseValidationException extends Error implements ValidationExceptionSchema {
	readonly error: string;
	readonly code: ExceptionCode | undefined;
	readonly statusCode: Http.Status;

	constructor(message: string, statusCode: Http.Status, code: ExceptionCode | undefined) {
		super(message);

		this.code = code;
		this.statusCode = statusCode;
		this.error = Http.StatusName[statusCode] ?? BaseValidationException.name;
	}

	[TO_RESPONSE](): NextResponse<ValidationExceptionSchema> {
		return NextResponse.json(
			{
				statusCode: this.statusCode,
				error: this.error,
				code: this.code,
				message: this.message,
			},
			{ status: this.statusCode },
		);
	}
}
