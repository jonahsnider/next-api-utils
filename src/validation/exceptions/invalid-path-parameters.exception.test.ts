import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';
import { TO_RESPONSE } from '../../constants.js';
import { ExceptionCode } from '../enums/exceptions.enum.js';
import { InvalidPathParametersException } from './invalid-path-parameters.exception.js';

test('serializes to a NextResponse', async () => {
	const schema = z.object({ a: z.string() });
	const parsed = schema.safeParse({ a: 1 });

	assert(!parsed.success);

	const exception = new InvalidPathParametersException(parsed.error);

	const response = exception[TO_RESPONSE]();

	assert.deepEqual(await response.json(), {
		statusCode: 422,
		code: ExceptionCode.InvalidPathParameters,
		error: 'Unprocessable Content',
		message: 'Validation error: Expected string, received number at "a"',
	});
});
