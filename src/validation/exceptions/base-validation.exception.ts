import { STATUS_CODES } from 'node:http';
import { NextResponse } from 'next/server.js';
import { TO_RESPONSE } from '../../constants.js';
import type { ValidationExceptionSchema } from '../dtos/exception.dto.js';
import type { ExceptionCode } from '../enums/exceptions.enum.js';

/**
 * The base class that exceptions thrown during validation inherit from.
 *
 * @public
 */
export class BaseValidationException extends Error implements ValidationExceptionSchema {
	readonly error: string;
	readonly code: ExceptionCode | undefined;
	readonly statusCode: number;

	constructor(message: string, statusCode: number, code: ExceptionCode | undefined) {
		super(message);

		this.code = code;
		this.statusCode = statusCode;
		this.error = STATUS_CODES[statusCode] ?? BaseValidationException.name;
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
