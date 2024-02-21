import { expect, test } from 'bun:test';
import { z } from 'zod';
import { InvalidPathParametersException } from './server.js';
import { validateParams } from './validate-params.js';

test('validates path parameters', () => {
	const context = {
		params: {
			a: '1',
			b: '2',
		},
	};

	const schema = z.object({
		a: z.string(),
		b: z.string(),
	});

	const result = validateParams(context, schema);

	expect(result).toStrictEqual({
		a: '1',
		b: '2',
	});
});

test('throws an exception if the path parameters are invalid', () => {
	const context = {
		params: {
			a: '1',
			b: '2',
		},
	};

	const schema = z.object({
		a: z.string(),
		b: z.number(),
	});

	expect(() => validateParams(context, schema)).toThrow(InvalidPathParametersException);
});
