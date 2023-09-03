import { NextResponse } from 'next/server.js';

/**
 * A symbol used to identify the method to convert a {@link BaseException | known application exception} to a {@link NextResponse}.
 *
 * @public
 */
export const TO_RESPONSE = Symbol.for('toResponse');
