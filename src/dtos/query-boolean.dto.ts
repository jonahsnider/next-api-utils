import { z } from 'zod';

/**
 * A Zod schema for a boolean in a query parameter.
 * Since query parameters must be strings, you can't validate them with a `z.boolean()` schema.
 * You can use this as a schema which parses a string into a boolean.
 * An empty string is treated as `true`, allowing `/path?flag` as shorthand for
 * `/path?flag=true`.
 *
 * @example
 * ```ts
 * QueryBooleanSchema.parse('1'); // true
 * QueryBooleanSchema.parse('false'); // false
 * ```
 *
 * @public
 **/
export const QueryBooleanSchema = z.union([z.boolean(), z.literal('').transform(() => true), z.stringbool()]);

/**
 * The inferred type of QueryBooleanSchema.
 *
 * @public
 */
export type QueryBooleanSchema = z.infer<typeof QueryBooleanSchema>;
