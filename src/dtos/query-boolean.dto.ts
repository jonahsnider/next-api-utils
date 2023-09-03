import yn from 'yn';
import { z } from 'zod';

/**
 * A Zod schema for a boolean in a query parameter.
 * Since query parameters must be strings, you can't validate them with a `z.boolean()` schema.
 * You can use {@link QueryBooleanSchema} as a schema which parses a string into a boolean.
 * It uses the [`yn`](https://github.com/sindresorhus/yn) library for parsing.
 *
 * @example
 * ```ts
 * QueryBooleanSchema.parse('1'); // true
 * QueryBooleanSchema.parse('false'); // false
 * ```
 **/
export const QueryBooleanSchema = z
	.string()
	.or(z.boolean())
	.transform((raw) => yn(raw))
	.pipe(z.boolean());
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type QueryBooleanSchema = z.infer<typeof QueryBooleanSchema>;
