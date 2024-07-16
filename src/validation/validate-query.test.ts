import assert from 'node:assert/strict';
import querystring from 'node:querystring';
import { test } from 'node:test';
import { z } from 'zod';
import { InvalidQueryParametersException } from './server.js';
import { extractQuery, validateQuery } from './validate-query.js';

test('validates query parameters', () => {
	const request = {
		url: new URL('http://localhost/?a=1&a=2&b=3').toString(),
	};

	const schema = z.object({
		a: z.array(z.string()),
		b: z.string(),
	});

	const result = validateQuery(request, schema);

	assert.deepStrictEqual(result, {
		a: ['1', '2'],
		b: '3',
	});
});

test('throws an exception if the query parameters are invalid', () => {
	const request = {
		url: new URL('http://localhost/?a=1&a=2&b=3').toString(),
	};

	const schema = z.object({
		a: z.array(z.number()),
		b: z.string(),
	});

	assert.throws(() => validateQuery(request, schema), InvalidQueryParametersException);
});

test('extracts query parameters', () => {
	const url = new URL('http://localhost/?a=1&a=2&b=3');

	const result = extractQuery(url);

	assert.deepEqual(result, { ...querystring.parse(url.search.slice('?'.length)) });
});
