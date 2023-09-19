import { QueryBooleanSchema } from './query-boolean.dto.js';
import { expect, test } from 'bun:test';

test('parses booleans', () => {
	expect(QueryBooleanSchema.parse(true)).toBe(true);
	expect(QueryBooleanSchema.parse(false)).toBe(false);
});

test('parses booleans formatted as strings', () => {
	expect(QueryBooleanSchema.parse('true')).toBe(true);
	expect(QueryBooleanSchema.parse('1')).toBe(true);
	expect(QueryBooleanSchema.parse('y')).toBe(true);

	expect(QueryBooleanSchema.parse('false')).toBe(false);
	expect(QueryBooleanSchema.parse('0')).toBe(false);
	expect(QueryBooleanSchema.parse('n')).toBe(false);
});

test('rejects invalid booleans', () => {
	expect(QueryBooleanSchema.safeParse('invalid').success).toBe(false);
	expect(QueryBooleanSchema.safeParse(undefined).success).toBe(false);
});
