import { useEffect, useState } from 'react';

import type { GetCoursesResponse } from '~api/getCourses';
import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/ErrorResponse';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CourseCard } from './CourseCard/CourseCard';

import s from './CoursesPage.module.scss';

export function CoursesPage() {
	const [state, setState] = useState<GetCoursesResponse | ErrorResponse>();

	useEffect(() => {
		const dataFetch = async () => {
			const response = await api.getCourses();
			let { error } = response;
			if (typeof error !== 'string') error = 'unknown';

			if ('courses' in response) {
				setState({ courses: response.courses.reverse(), status: response.status });
			} else {
				setState({ error: response.error, status: response.status });
			}
		};

		dataFetch();
	}, []);

	return (
		<Block component="main" className={s.CoursesPage}>
			<Grid container component="section" className={s.container}>
				<Typography component="h2">Courses</Typography>
				<Grid row component="section" className={s.courses}>
					{state?.status === 'success' && (
						state.courses.map((course) => (
							<CourseCard
								key={course.id}
								title={course.title}
								previewImg={course.previewImageLink}
								video={course.meta?.courseVideoPreview?.link || ''}
								description={course.description || ''}
								lessonsCount={course.lessonsCount}
								skills={course.tags}
								rating={course.rating}
								className="col-xx-6 col-md-12"
							/>
						))
					)}
					{!state?.status && <Typography component="h1">LOADING...</Typography>}
					{state?.status === 'error' && typeof state.error === 'string' && <Typography component="h1">{state.error}</Typography>}
				</Grid>
			</Grid>
		</Block>
	);
}
