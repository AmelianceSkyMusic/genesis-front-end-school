import type { ErrorResponse } from '~api/types/ErrorResponse';

export function returnError(errorPath: string, error: unknown): ErrorResponse {
	// eslint-disable-next-line no-console
	console.error('WISEY API >', `${errorPath}:\n`, error);
	return { error, status: 'error' };
}
