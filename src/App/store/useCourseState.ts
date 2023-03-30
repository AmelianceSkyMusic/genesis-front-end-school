import asm from 'asm-ts-scripts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { BASE_URL } from './constants/BASE_URL';
import { returnError } from './helpers/returnError';
import type { CourseResponse, LessonResponse } from './types/CourseResponse';
import type { ErrorResponse } from './types/ErrorResponse';

interface FetchCourse {
	token: string;
	id: string;
}

interface Course {
	title: string | null;
	description: string | null;
	lessonsCount: number | null;
	skills: string[] | null;
	rating: number | null;
}

export interface Lesson {
	id: string | null;
	title: string | null;
	order: number | null;
	previewImageLink: string | null;
	videoLink: string | null;
	duration: number | null;
	unlocked: boolean | null;
}

interface UseCourseState {
	course: Course;
	lessons: Lesson[];
	currentLessonId: string | null;
	setCurrentLessonId: (currentLessonId: string) => void;
	currentLessonNumber: number;
	setCurrentLessonNumber: (currentLessonNumber: number) => void;
	loading: boolean;
	error: string | null;
	fetchCourse: ({ token, id }: FetchCourse) => void;
}

function arrangeCourse(course: CourseResponse) {
	return {
		title: course?.title || null,
		description: course?.description || null,
		lessonsCount: course?.lessons.length || null,
		skills: Array.isArray(course?.meta?.skills)
			? course?.meta?.skills : null,
		rating: course?.rating || null,
	};
}

function arrangeLessons(lessons: LessonResponse[]): Lesson[] {
	const lessonsFiltered = lessons.map((lesson) => ({
		id: lesson.id || null,
		title: lesson.title || null,
		order: lesson.order || null,
		previewImageLink: lesson.previewImageLink ? `${lesson.previewImageLink}/lesson-${lesson.order}.webp` : null,
		videoLink: lesson.link || null,
		duration: lesson.duration || null,
		unlocked: lesson.status ? lesson.status === 'unlocked' : null,
	}));

	return asm.sortArrayOfObj(lessonsFiltered, 'order');
}

const requestURL = 'core/preview-courses/';

export const useCourseState = create<UseCourseState>()(devtools((set) => ({
	course: {} as Course,
	lessons: [] as Lesson[],
	currentLessonId: null,
	setCurrentLessonId: (currentLessonId: string) => { set({ currentLessonId }); },
	currentLessonNumber: 0,
	setCurrentLessonNumber: (currentLessonNumber: number) => { set({ currentLessonNumber }); },
	loading: false,
	error: null,
	fetchCourse: async ({ token, id }: FetchCourse) => {
		set({ loading: true });
		try {
			const fetchUrl = `${BASE_URL}${requestURL}${id}`;
			const headers = new Headers({ Authorization: `Bearer ${token}` });

			const response = await fetch(fetchUrl, { headers });
			const data = await response.json() as CourseResponse | ErrorResponse;

			if ('statusCode' in data) throw new Error(data.statusCode.toString());

			const course = arrangeCourse(data);
			const lessons = arrangeLessons(data.lessons);

			set({
				course,
				lessons,
				error: null,
			});
		} catch (error) {
			if (error instanceof Error) {
				switch (error.message) {
					case '400': set({ error: returnError('useCoursesState', 'Sorry, can\'t find course=(') });
						break;
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
