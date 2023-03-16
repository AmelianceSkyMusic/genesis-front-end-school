import type { SuccessResponse } from '~api/types/SuccessResponse';

export function returnSuccess<T>(data?: T): SuccessResponse {
	return { status: 'success', ...data };
}
