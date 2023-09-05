import { expect, test } from 'vitest';
import { z } from 'zod';
import { extractQuery, validateQuery } from './validate-query.js';

import querystring from 'node:querystring';
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

test('extracts query parameters', () => {
	const url = new URL('http://localhost/?a=1&a=2&b=3');

	const result = extractQuery(url);

	expect(result).toEqual(querystring.parse(url.search.slice('?'.length)));
});
