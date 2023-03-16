import { BASE_URL } from './constants/BASE_URL';
import { getToken } from './getToken';
import { returnError } from './helpers/returnError';
import { returnSuccess } from './helpers/returnSuccess';
import type { Course } from './types/Courses';
import type { ErrorResponse } from './types/ErrorResponse';
import type { SuccessResponse } from './types/SuccessResponse';

const filePath = 'src/App/api/getCourses.ts';

const requestURL = 'core/preview-courses';

export interface GetCoursesResponse extends SuccessResponse {
	courses: Course[];
}

export async function getCourses(): Promise<GetCoursesResponse | ErrorResponse> {
	try {
		const tokenResponse = await getToken();
		if (tokenResponse.status === 'error') return returnError(filePath, 'Invalid token');
		const { token } = tokenResponse;

		const fetchUrl = `${BASE_URL}${requestURL}`;
		const headers = new Headers({ Authorization: `Bearer ${token}` });

		const response = await fetch(fetchUrl, { headers });
		const data = await response.json();

		if (data.statusCode === 401) {
			return returnError(filePath, 'Authorization error');
		}

		return returnSuccess({ courses: data.courses }) as GetCoursesResponse;
	} catch (error) {
		return returnError(filePath, error);
	}
}
