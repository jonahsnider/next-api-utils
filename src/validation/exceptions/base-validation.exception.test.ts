import assert from 'node:assert/strict';
import test from 'node:test';
import { TO_RESPONSE } from '../../constants.js';
import { ExceptionCode } from '../enums/exceptions.enum.js';
import { BaseValidationException } from './base-validation.exception.js';

test('serializes to a NextResponse', async () => {
	const exception = new BaseValidationException('message', 400, ExceptionCode.InvalidBody);

	const response = exception[TO_RESPONSE]();

	assert.deepEqual(await response.json(), {
		code: ExceptionCode.InvalidBody,
		error: 'Bad Request',
		message: 'message',
		statusCode: 400,
	});
});
