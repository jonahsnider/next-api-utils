import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NextRequest, NextResponse } from 'next/server.js';
import { z } from 'zod';
import { TO_RESPONSE } from '../constants.js';
import { validateQuery } from '../server.js';
import { type BaseException, ExceptionWrapper, type IsException } from './exception-wrapper.js';

class CustomException extends Error implements BaseException<unknown> {
	[TO_RESPONSE](): NextResponse<unknown> {
		return new NextResponse(this.message, { status: 400 });
	}
}

test('responds with known exceptions', async () => {
	const isException: IsException<CustomException> = (error): error is CustomException =>
		error instanceof CustomException;

	const exceptionWrapper = new ExceptionWrapper(isException);

	const route = (): NextResponse<unknown> => {
		throw new CustomException('custom');
	};

	const wrapped = exceptionWrapper.wrapRoute(route);

	const result = await wrapped(new NextRequest('http://localhost'));
	assert.equal(await result.text(), 'custom');
});

test('reraises unknown exceptions', async () => {
	const exceptionWrapper = new ExceptionWrapper();

	const route = (): NextResponse<unknown> => {
		throw new Error('unknown');
	};

	const wrapped = exceptionWrapper.wrapRoute(route);

	const [result] = await Promise.allSettled([wrapped(new NextRequest('http://localhost'))]);

	assert.equal(result.status, 'rejected');
	assert(result.reason instanceof Error);
	assert.equal(result.reason.message, 'unknown');
});

test('automatically catches validation exceptions', async () => {
	const exceptionWrapper = new ExceptionWrapper();

	const route = (): NextResponse<unknown> => {
		validateQuery({ url: 'http://localhost' }, z.object({ foo: z.string() }));

		return new NextResponse('unreachable');
	};

	const wrapped = exceptionWrapper.wrapRoute(route);

	const result = await wrapped(new NextRequest('http://localhost'));
	assert.deepEqual(await result.json(), {
		code: 'E_INVALID_QUERY_PARAMS',
		error: 'Unprocessable Content',
		message: '✖ Invalid input: expected string, received undefined\n  → at foo',
		statusCode: 422,
	});
});
