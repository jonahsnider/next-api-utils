import { TO_RESPONSE } from '../../constants.js';
import { ExceptionCode } from '../enums/exceptions.enum.js';
import { BaseValidationException } from './base-validation.exception.js';
import { expect, test } from 'bun:test';

test('serializes to a NextResponse', () => {
	const exception = new BaseValidationException('message', 400, ExceptionCode.InvalidBody);

	const response = exception[TO_RESPONSE]();

	expect(response.json()).resolves.toStrictEqual({
		code: ExceptionCode.InvalidBody,
		error: 'Bad Request',
		message: 'message',
		statusCode: 400,
	});
});
