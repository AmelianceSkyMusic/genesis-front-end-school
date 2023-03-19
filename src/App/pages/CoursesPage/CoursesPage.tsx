import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '~api/index';
import type { Course } from '~api/types/Courses';
import type { ErrorResponse } from '~api/types/ErrorResponse';
import { ErrorPlaceholder } from '~components/ErrorPlaceholder/ErrorPlaceholder';
import { Pagination } from '~components/Pagination/Pagination';
import { ROUTES } from '~constants/ROUTES';
import { NotFoundPage } from '~pages/NotFoundPage';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CourseCard } from './CourseCard/CourseCard';

import s from './CoursesPage.module.scss';

const firstPageNumber = 0;
const coursesPerPage = 10;

export function CoursesPage() {
	const navigate = useNavigate();
	const { pageNumber } = useParams();

	const [state, setState] = useState<{ courses: Course[][]; status: 'success' } | ErrorResponse>();
	const [currentPage, setCurrentPage] = useState<number>(pageNumber ? Number(pageNumber) - 1 : 0);
	const [lastPageNumber, setLastPageNumber] = useState(Infinity);

	useEffect(() => {
		const dataFetch = async () => {
			const response = await api.getCourses();
			let { error } = response;
			if (typeof error !== 'string') error = 'unknown';

			if ('courses' in response) {
				const { courses } = response;
				const coursesPages = [];
				for (let i = 0; i < courses.length; i += coursesPerPage) {
					coursesPages.push(courses.slice(i, i + coursesPerPage));
				}
				setLastPageNumber(coursesPages.length - 1);
				setState({ courses: coursesPages, status: response.status });
			} else {
				setState({ error: response.error, status: response.status });
			}
		};

		dataFetch();
	}, []);

	const handlePaginationSetCurrentPage = (curPage: number) => {
		setCurrentPage(curPage);
		navigate(`${ROUTES.COURSES}/${curPage + 1}`);
	};

	console.log('currentPage: ', currentPage);
	if (currentPage < firstPageNumber || currentPage > lastPageNumber) return <NotFoundPage />;

	if (state?.status === 'error' && typeof state.error === 'string') {
		return (
			<ErrorPlaceholder>
				<Typography component="p1">{state.error}</Typography>
			</ErrorPlaceholder>
		);
	}

	return (
		<Block component="main" className={s.CoursesPage}>
			<Grid container component="section" className={s.container}>
				{state?.status === 'success' && (
					<>
						<Typography component="h2">Courses</Typography>
						<Grid row component="section" className={s.courses}>
							{
								state.courses[currentPage].map((course) => (
									<CourseCard
										key={course.id}
										id={course.id}
										title={course.title}
										previewImg={`${course.previewImageLink}/cover.webp`}
										video={course.meta?.courseVideoPreview?.link || ''}
										description={course.description || ''}
										lessonsCount={course.lessonsCount}
										skills={Array.isArray(course.meta.skills) ? course.meta.skills : null}
										rating={course.rating}
										className="col-xx-4 col-lg-6 col-md-12"
									/>
								))
							}
						</Grid>
						<Pagination
							setCurrentPage={handlePaginationSetCurrentPage}
							currentPageNumber={currentPage}
							firstPageNumber={firstPageNumber}
							lastPageNumber={lastPageNumber}
						/>
					</>
				)}
			</Grid>
			{!state?.status && <LoaderOverlay />}
		</Block>
	);
}
