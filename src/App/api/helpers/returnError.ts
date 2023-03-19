import type { ErrorResponse } from '~api/types/ErrorResponse';
import { APP } from '~constants/APP';

export function returnError(errorPath: string, error: unknown): ErrorResponse {
	// eslint-disable-next-line no-console
	console.error(`${APP.NAME} API >`, `${errorPath}:\n`, error);
	return { error, status: 'error' };
}
