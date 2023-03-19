import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import type { GetCourseResponse } from '~api/getCourse';
import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/ErrorResponse';
import { ErrorPlaceholder } from '~components/ErrorPlaceholder/ErrorPlaceholder';
import { ROUTES } from '~constants/ROUTES';
import { asmJoinWith } from '~helpers/asmJoinWith';
import { toTimeString } from '~helpers/toTimeString';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { LinkLabel } from '~/ameliance-ui/components/Link';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CurrentLesson } from './CurrentLesson/CurrentLesson';
import { LessonCard } from './LessonCard/LessonCard';

import s from './CoursePage.module.scss';

export function CoursePage() {
	const [state, setState] = useState<GetCourseResponse | ErrorResponse>();

	const [searchParams] = useSearchParams();
	const courseId = searchParams.get('id') || '';
	const currentLessonNumber = Number(searchParams.get('lesson') || 1) - 1;

	useEffect(() => {
		if (courseId) {
			const dataFetch = async () => {
				const response = await api.getCourse(courseId);

				let { error } = response;
				if (typeof error !== 'string') error = 'unknown';

				if ('course' in response) {
					setState({ course: { ...response.course, ...{ lessons: asm.sortArrayOfObj(response.course.lessons, 'order') } }, status: response.status });
				} else {
					setState({ error: response.error, status: response.status });
				}
			};

			dataFetch();
		} else {
			setState({ error: 'Sorry can\'t find course=(', status: 'error' });
		}
	}, [courseId]);

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
								current={
									state.course.lessons[currentLessonNumber].order
										=== currentLessonNumber + 1
								}
								courseId={courseId}
								className="col-xx-12"
								video={state.course.lessons[currentLessonNumber].link}
							/>
							<Block className={s.lessonsContainer}>
								<Typography component="h3" className="col-xx-12">Other lessons</Typography>
								{
									state.course.lessons.map((lesson) => (
										<LessonCard
											key={lesson.id}
											lessonNumber={lesson.order.toString()}
											title={lesson.title}
											previewImg={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
											duration={toTimeString(lesson.duration)}
											unlocked={lesson.status === 'unlocked'}
											current={lesson.order === currentLessonNumber + 1}
											courseId={courseId}
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
