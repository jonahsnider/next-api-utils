import { z } from 'zod';

export type RequestSchema<
	RequestBody extends z.Schema | undefined = undefined,
	QueryParameters extends z.Schema | undefined = undefined,
	PathParameters extends z.Schema | undefined = undefined,
> = {
	body: RequestBody;
	query: QueryParameters;
	params: PathParameters;
};
