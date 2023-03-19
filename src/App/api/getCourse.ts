import { BASE_URL } from './constants/BASE_URL';
import { getToken } from './getToken';
import { returnError } from './helpers/returnError';
import { returnSuccess } from './helpers/returnSuccess';
import type { Course } from './types/Course';
import type { ErrorResponse } from './types/ErrorResponse';
import type { SuccessResponse } from './types/SuccessResponse';

const filePath = 'src/App/api/getCourse.ts';

const requestURL = 'core/preview-courses/';

export interface GetCourseResponse extends SuccessResponse {
	course: Course;
}

export async function getCourse(id: string): Promise<GetCourseResponse | ErrorResponse> {
	try {
		const tokenResponse = await getToken();
		if (tokenResponse.status === 'error') return returnError(filePath, 'Invalid token');
		const { token } = tokenResponse;

		const fetchUrl = `${BASE_URL}${requestURL}${id}`;
		const headers = new Headers({ Authorization: `Bearer ${token}` });

		const response = await fetch(fetchUrl, { headers });
		const data = await response.json();

		if (data.statusCode) {
			switch (data.statusCode) {
				case 400: return returnError(filePath, 'Sorry, can\'t find course=(');
				case 401: return returnError(filePath, 'Authorization error');
				case 504: return returnError(filePath, 'Sorry, gateway time out. Try again later!');
				default: return returnError(filePath, 'Sorry, something went wrong! =(');
			}
		}

		return returnSuccess({ course: data }) as GetCourseResponse;
	} catch (error) {
		return returnError(filePath, error);
	}
}
