import { BASE_URL } from './constants/BASE_URL';
import { returnError } from './helpers/returnError';
import { returnSuccess } from './helpers/returnSuccess';
import type { ErrorResponse } from './types/ErrorResponse';
import type { SuccessResponse } from './types/SuccessResponse';
import type { Token } from './types/Token';

export interface GetTokenResponse extends SuccessResponse {
	token: Token;
}

const filePath = 'src/App/api/getToken.ts';

const requestURL = 'auth/anonymous?platform=subscriptions';

export async function getToken(): Promise<GetTokenResponse | ErrorResponse> {
	try {
		const tokenResponse = await fetch(`${BASE_URL}${requestURL}`);
		const tokenData = await tokenResponse.json();
		const { token } = tokenData;

		if (typeof token === 'string' && token.length > 0) {
			return returnSuccess({ token: tokenData.token }) as GetTokenResponse;
		}

		return returnError(filePath, 'Can\'t get token');
	} catch (error) {
		return returnError(filePath, error);
	}
}
