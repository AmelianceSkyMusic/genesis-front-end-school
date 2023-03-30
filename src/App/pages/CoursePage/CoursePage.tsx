import { useCallback, useEffect } from 'react';
import type { URLSearchParamsInit } from 'react-router-dom';
import { Link, useBeforeUnload, useSearchParams } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { ErrorPlaceholder } from '~components/ErrorPlaceholder/ErrorPlaceholder';
import { ROUTES } from '~constants/ROUTES';
import { asmJoinWith } from '~helpers/asmJoinWith';
import { getLocalStorage } from '~helpers/getLocalStorage';
import { setLocalStorage } from '~helpers/setLocalStorage';
import { useCourseState } from '~store/useCourseState';
import { useUserState } from '~store/useUserState';

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
	const token = useUserState((state) => state.token);
	const tokenError = useUserState((state) => state.error);

	const {
		course,
		lessons,
		currentLessonId,
		setCurrentLessonId,
		currentLessonNumber,
		setCurrentLessonNumber,
		loading,
		error,
		fetchCourse,
	} = useCourseState((state) => ({
		course: state.course,
		lessons: state.lessons,
		currentLessonId: state.currentLessonId,
		setCurrentLessonId: state.setCurrentLessonId,
		currentLessonNumber: state.currentLessonNumber,
		setCurrentLessonNumber: state.setCurrentLessonNumber,
		loading: state.loading,
		error: state.error,
		fetchCourse: state.fetchCourse,
	}));

	const [searchParams, setSearchParams] = useSearchParams();
	const courseIdParam = searchParams.get('id') || '';
	const currentLessonNumberParam = Number(searchParams.get('lesson') || 1) - 1;
	const currentTime = Number(searchParams.get('time'));

	useEffect(() => {
		if (token) fetchCourse({ token, id: courseIdParam || '' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessons]);

	useEffect(() => {
		if (currentLessonNumberParam >= 0) setCurrentLessonNumber(currentLessonNumberParam);

		const lessonId = lessons[currentLessonNumber]?.id;
		if (lessonId) setCurrentLessonId(lessonId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLessonNumberParam]);

	// const [currentLessonNumber, setCurrentLessonNumber] = useState(currentLessonNumberParam);

	const updateParams = ({ id, lesson, time }: CoursePageParams) => {
		const idParam = searchParams.get('id');
		const lessonParam = searchParams.get('lesson');
		const params = {} as CoursePageParams;
		if (id || idParam) params.id = id || idParam || '';
		if (lesson || lessonParam) params.lesson = lesson || lessonParam || '';
		if (time) params.time = time || '';
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
		setCurrentLessonId(id);
		updateParams({ lesson: number.toString() });
	};

	if (error || tokenError) return <ErrorPlaceholder>{error || tokenError}</ErrorPlaceholder>;

	return (
		<Block component="main" className={s.CoursePage}>
			<Grid container component="section" className={s.container}>
				{!asm.isObjectEmpty(course) && lessons.length > 0 && (
					<>
						<Link to={`${ROUTES.COURSES}/1`}>
							<LinkLabel underline={false} display="h4">
								Courses /
							</LinkLabel>
						</Link>
						<Grid row component="section" className={s.course}>
							<Block className={s.courseTextContent}>
								<Typography component="h3">{course.title}</Typography>
								<Typography component="p1">{course.description}</Typography>
								<Block className={s.courseDetailsContent}>
									<Typography component="p1">
										<b>Lessons: </b>
										{course.lessonsCount}
									</Typography>
									<Typography component="p1">
										<b>Rating: </b>
										{`${course.rating} / 5`}
									</Typography>
									{course.skills && course.skills.length > 0 && (
										<Typography component="p1">
											<b>Skills: </b>
											{asmJoinWith(', ', course.skills)}
										</Typography>
									)}
								</Block>
							</Block>
							<CurrentLesson
								key={lessons[currentLessonNumber].id}
								lesson={lessons[currentLessonNumber]}
								currentTime={currentTime}
								onCurrentTimeChange={setCurrentTimeParams}
								grid={{ xx: 12 }}
							/>
							<Block className={s.lessonsContainer}>
								<Typography component="h3" className="col-xx-12">Other lessons</Typography>
								{
									lessons.map((lesson) => (
										<LessonCard
											key={lesson.id}
											lesson={lesson}
											current={
												(lesson.order || 1) === currentLessonNumber + 1
											}
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
			{loading === true && <LoaderOverlay />}
		</Block>
	);
}
