import assert from 'node:assert/strict';
import { test } from 'node:test';
import { QueryBooleanSchema } from './query-boolean.dto.ts';

test('parses booleans', () => {
	assert.equal(QueryBooleanSchema.parse(true), true);
	assert.equal(QueryBooleanSchema.parse(false), false);
});

test('parses booleans formatted as strings', () => {
	assert.equal(QueryBooleanSchema.parse('true'), true);
	assert.equal(QueryBooleanSchema.parse('1'), true);
	assert.equal(QueryBooleanSchema.parse('y'), true);
	assert.equal(QueryBooleanSchema.parse('enabled'), true);

	assert.equal(QueryBooleanSchema.parse('false'), false);
	assert.equal(QueryBooleanSchema.parse('0'), false);
	assert.equal(QueryBooleanSchema.parse('n'), false);
	assert.equal(QueryBooleanSchema.parse('disabled'), false);
});

test('treats a valueless query parameter as true', () => {
	assert.equal(QueryBooleanSchema.parse(''), true);
});

test('rejects invalid booleans', () => {
	assert.equal(QueryBooleanSchema.safeParse('invalid').success, false);
	assert.equal(QueryBooleanSchema.safeParse(undefined).success, false);
});
