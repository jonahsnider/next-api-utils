/**
 * A symbol used to identify the method to convert a {@link BaseException | known application exception} to a {@link next/server#NextResponse}.
 *
 * @public
 */
export const TO_RESPONSE = Symbol.for('toResponse');
