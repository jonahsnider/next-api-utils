import { z } from 'zod';
import { ExceptionCode } from '../enums/exceptions.enum.ts';

/**
 * The schema for {@link BaseValidationException}.
 *
 * @public
 */
export const ValidationExceptionSchema = z.object({
	message: z.string(),
	code: z.enum(ExceptionCode).optional(),
	statusCode: z.number(),
	error: z.string(),
});
/**
 * The inferred type for ValidationExceptionSchema.
 *
 * @public
 */
export type ValidationExceptionSchema = z.infer<typeof ValidationExceptionSchema>;
