import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';
import { TO_RESPONSE } from '../../constants.ts';
import { ExceptionCode } from '../enums/exceptions.enum.ts';
import { InvalidQueryParametersException } from './invalid-query-parameters.exception.ts';

test('serializes to a NextResponse', async () => {
	const schema = z.object({ a: z.string() });
	const parsed = schema.safeParse({ a: 1 });

	assert(!parsed.success);

	const exception = new InvalidQueryParametersException(parsed.error);

	const response = exception[TO_RESPONSE]();

	assert.deepEqual(await response.json(), {
		statusCode: 422,
		code: ExceptionCode.InvalidQueryParameters,
		error: 'Unprocessable Content',
		message: '✖ Invalid input: expected string, received number\n  → at a',
	});
});
