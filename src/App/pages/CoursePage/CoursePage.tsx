import { useCallback, useEffect, useState } from 'react';
import type { URLSearchParamsInit } from 'react-router-dom';
import { Link, useBeforeUnload, useSearchParams } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import type { GetCourseResponse } from '~api/getCourse';
import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/ErrorResponse';
import { ErrorPlaceholder } from '~components/ErrorPlaceholder/ErrorPlaceholder';
import { ROUTES } from '~constants/ROUTES';
import { asmJoinWith } from '~helpers/asmJoinWith';
import { getLocalStorage } from '~helpers/getLocalStorage';
import { setLocalStorage } from '~helpers/setLocalStorage';
import { toTimeString } from '~helpers/toTimeString';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { LinkLabel } from '~/ameliance-ui/components/Link';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CurrentLesson } from './CurrentLesson/CurrentLesson';
import { LessonCard } from './LessonCard/LessonCard';

import s from './CoursePage.module.scss';

interface CoursePageParams {
	id?: string;
	lesson?: string;
	time?: string;
}

export function CoursePage() {
	const [state, setState] = useState<GetCourseResponse | ErrorResponse>();

	const [searchParams, setSearchParams] = useSearchParams();
	const courseId = searchParams.get('id') || '';
	const currentLessonNumberParam = Number(searchParams.get('lesson') || 1) - 1;
	const currentTime = Number(searchParams.get('time'));

	const [currentLessonNumber, setCurrentLessonNumber] = useState(currentLessonNumberParam);
	const [currentLessonId, setCurrentLessonId] = useState<string>();

	useEffect(() => {
		if (courseId) {
			const dataFetch = async () => {
				const response = await api.getCourse(courseId);

				let { error } = response;
				if (typeof error !== 'string') error = 'unknown';

				if ('course' in response) {
					setCurrentLessonId(response.course.lessons[currentLessonNumber].id);
					setState({ course: { ...response.course, ...{ lessons: asm.sortArrayOfObj(response.course.lessons, 'order') } }, status: response.status });
				} else {
					setState({ error: response.error, status: response.status });
				}
			};

			dataFetch();
		} else {
			setState({ error: 'Sorry can\'t find course=(', status: 'error' });
		}
	}, [courseId, currentLessonNumber]);

	const updateParams = ({ id, lesson, time }: CoursePageParams) => {
		const idParam = searchParams.get('id');
		const lessonParam = searchParams.get('lesson');
		const timeParam = searchParams.get('time');
		const params = {} as CoursePageParams;
		if (id || idParam) params.id = id || idParam || '';
		if (lesson || lessonParam) params.lesson = lesson || lessonParam || '';
		if (time || timeParam) params.time = time || timeParam || '';
		if (!asm.isObjectEmpty(params)) setSearchParams(params as URLSearchParamsInit);
	};

	const setCurrentTimeParams = (time: number) => {
		updateParams({ time: time.toString() });
		if (currentLessonId) setLocalStorage(currentLessonId, 'time', time);
	};

	useEffect(() => {
		if (currentLessonId) {
			const savedTime = getLocalStorage(currentLessonId, 'time');
			if (savedTime) setCurrentTimeParams(savedTime);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLessonId]);

	useBeforeUnload(
		useCallback(() => {
			if (currentLessonId && currentTime) setLocalStorage(currentLessonId, 'time', currentTime);
		}, [currentLessonId, currentTime]),
	);

	const handleSetCurrentLessonOnClick = (number: number, id: string) => {
		setCurrentLessonNumber(number);
		setCurrentLessonId(id);
		updateParams({ lesson: (number + 1).toString() });
	};

	if (state?.status === 'error' && typeof state.error === 'string') {
		return (
			<ErrorPlaceholder>
				<Typography component="p1">{state.error}</Typography>
			</ErrorPlaceholder>
		);
	}

	return (
		<Block component="main" className={s.CoursePage}>
			<Grid container component="section" className={s.container}>
				{state?.status === 'success' && (
					<>
						<Link to={`${ROUTES.COURSES}/1`}>
							<LinkLabel underline={false} display="h5">← Courses</LinkLabel>
						</Link>
						<Grid row component="section" className={s.course}>
							<Block className={s.courseTextContent}>
								<Typography component="h2">{state.course.title}</Typography>
								<Typography component="p1">{state.course.description}</Typography>
								<Block className={s.courseDetailsContent}>
									<Typography component="p1">
										<b>Lessons: </b>
										{state.course.lessons.length}
									</Typography>
									<Typography component="p1">
										<b>Rating: </b>
										{`${state.course.rating} / 5`}
									</Typography>
									{Array.isArray(state.course.meta.skills)
										&& state.course.meta.skills.length > 0
										&& (
											<Typography component="p1">
												<b>Skills: </b>
												{asmJoinWith(', ', state.course.meta.skills)}
											</Typography>
										)}
								</Block>
							</Block>
							<CurrentLesson
								key={state.course.lessons[currentLessonNumber].id}
								lessonNumber={state.course.lessons[currentLessonNumber].order.toString()}
								title={state.course.lessons[currentLessonNumber].title}
								previewImg={`${state.course.lessons[currentLessonNumber].previewImageLink}/lesson-${state.course.lessons[currentLessonNumber].order}.webp`}
								duration={toTimeString(state.course.lessons[currentLessonNumber].duration)}
								video={state.course.lessons[currentLessonNumber].link}
								currentTime={currentTime}
								onCurrentTimeChange={setCurrentTimeParams}
								className="col-xx-12"
							/>
							<Block className={s.lessonsContainer}>
								<Typography component="h3" className="col-xx-12">Other lessons</Typography>
								{
									state.course.lessons.map((lesson) => (
										<LessonCard
											key={lesson.id}
											id={lesson.id}
											lessonNumber={lesson.order}
											title={lesson.title}
											previewImg={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
											duration={toTimeString(lesson.duration)}
											unlocked={lesson.status === 'unlocked'}
											current={lesson.order === currentLessonNumber + 1}
											onClick={handleSetCurrentLessonOnClick}
											className={s.lesson}
										/>
									))
								}
							</Block>
						</Grid>
					</>
				)}
			</Grid>
			{!state?.status && <LoaderOverlay />}
		</Block>
	);
}
