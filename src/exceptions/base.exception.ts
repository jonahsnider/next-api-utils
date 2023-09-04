import { STATUS_CODES } from 'node:http';
import { NextResponse } from 'next/server.js';
import { TO_RESPONSE } from '../constants.js';
import type { ExceptionSchema } from './dtos/exception.dto.js';
import type { ExceptionCode } from './enums/exceptions.enum.js';

export class BaseHttpException extends Error {
	readonly error: string;
	readonly code: ExceptionCode | undefined;
	readonly statusCode: number;

	constructor(message: string, statusCode: number, code: ExceptionCode | undefined) {
		super(message);

		this.code = code;
		this.statusCode = statusCode;
		this.error = STATUS_CODES[statusCode] ?? BaseHttpException.name;
	}

	[TO_RESPONSE](): NextResponse<ExceptionSchema> {
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
