import { expect, test } from 'bun:test';
import querystring from 'node:querystring';
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

	expect(result).toStrictEqual({
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

	expect(() => validateQuery(request, schema)).toThrow(InvalidQueryParametersException);
});

test('extracts query parameters', () => {
	const url = new URL('http://localhost/?a=1&a=2&b=3');

	const result = extractQuery(url);

	expect(result).toEqual(querystring.parse(url.search.slice('?'.length)));
});
