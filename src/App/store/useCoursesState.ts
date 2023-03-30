import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { BASE_URL } from './constants/BASE_URL';
import { returnError } from './helpers/returnError';
import type { CoursesResponse } from './types/CoursesResponse';
import type { ErrorResponse } from './types/ErrorResponse';

interface FetchCourses {
	token: string;
	coursesPerPage?: number;
}

interface Courses {
	id: string;
	title: string;
	previewImageLink: string;
	videoLink: string;
	description: string;
	lessonsCount: number;
	skills: string[] | null;
	rating: number | null;
}

interface UseCoursesState {
	courses: Courses[][];
	currentPage: number;
	firstPageNumber: number;
	lastPageNumber: number;
	setCurrentPage: (currentPage: number) => void;
	loading: boolean;
	error: string | null;
	fetchCourses: ({ token, coursesPerPage }: FetchCourses) => void;
}

const requestURL = 'core/preview-courses';

function arrangeCoursesByPages(coursesData: CoursesResponse['courses'], coursesPerPage: number) {
	const courses = coursesData.map((course) => ({
		id: course?.id || '',
		title: course?.title || '',
		previewImageLink: course?.previewImageLink ? `${course.previewImageLink}/cover.webp` : '',
		videoLink: course?.meta?.courseVideoPreview?.link || '',
		description: course?.description || '',
		lessonsCount: course?.lessonsCount || 0,
		skills: Array.isArray(course?.meta?.skills)
			? course?.meta?.skills : null,
		rating: course?.rating || null,
	}));

	const coursesByPage = [] as Courses[][];

	for (let i = 0; i < courses.length; i += coursesPerPage) {
		coursesByPage.push(courses.slice(i, i + coursesPerPage));
	}

	return coursesByPage;
}

export const useCoursesState = create<UseCoursesState>()(devtools((set) => ({
	courses: [] as Courses[][],
	currentPage: 0,
	firstPageNumber: 0,
	lastPageNumber: Infinity,
	setCurrentPage: (currentPage: number) => { set({ currentPage }); },
	loading: false,
	error: null,
	fetchCourses: async ({ token, coursesPerPage = 10 }: FetchCourses) => {
		set({ loading: true });
		try {
			const fetchUrl = `${BASE_URL}${requestURL}`;
			const headers = new Headers({ Authorization: `Bearer ${token}` });

			const response = await fetch(fetchUrl, { headers });
			const data = await response.json() as CoursesResponse | ErrorResponse;

			if ('statusCode' in data) throw new Error(data.statusCode.toString());

			const coursesByPage = arrangeCoursesByPages(data.courses, coursesPerPage);

			set({
				courses: coursesByPage,
				lastPageNumber: coursesByPage.length - 1,
				error: null,
			});
		} catch (error) {
			if (error instanceof Error) {
				switch (error.message) {
					case '401': set({ error: returnError('useCoursesState', 'Authorization error') });
						break;
					case '504': set({ error: returnError('useCoursesState', 'Sorry, gateway time out. Try again later!') });
						break;
					default:
						set({ error: returnError('useCoursesState', error) });
						break;
				}
			} else {
				set({ error: returnError('useCoursesState', error) });
			}
		} finally {
			set({ loading: false });
		}
	},
})));
