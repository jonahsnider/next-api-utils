import { expect, test } from 'bun:test';
import { z } from 'zod';
import { InvalidBodyException } from './server.js';
import { validateBody } from './validate-body.js';

test('validates request body', async () => {
	const request = new Request('http://localhost/', {
		body: JSON.stringify({
			a: '1',
			b: '2',
		}),
		method: 'POST',
	});

	const schema = z.object({
		a: z.string(),
		b: z.string(),
	});

	const result = await validateBody(request, schema);

	expect(result).toStrictEqual({
		a: '1',
		b: '2',
	});
});

test('throws an exception if the request body is invalid', async () => {
	const request = new Request('http://localhost/', {
		body: JSON.stringify({
			a: '1',
			b: '2',
		}),
		method: 'POST',
	});

	const schema = z.object({
		a: z.string(),
		b: z.number(),
	});

	await expect(validateBody(request, schema)).rejects.toBeInstanceOf(InvalidBodyException);
});

test('throws an exception if the request body is not JSON', async () => {
	const request = new Request('http://localhost/', {
		body: 'not json',
		method: 'POST',
	});

	const schema = z.object({
		a: z.string(),
		b: z.number(),
	});

	await expect(validateBody(request, schema)).rejects.toBeInstanceOf(InvalidBodyException);
});
