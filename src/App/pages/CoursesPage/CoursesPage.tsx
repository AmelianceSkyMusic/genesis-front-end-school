import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorPlaceholder } from '~components/ErrorPlaceholder/ErrorPlaceholder';
import { Pagination } from '~components/Pagination/Pagination';
import { ROUTES } from '~constants/ROUTES';
import { NotFoundPage } from '~pages/NotFoundPage';
import { useCoursesState } from '~store/useCoursesState';
import { useUserState } from '~store/useUserState';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CourseCard } from './CourseCard/CourseCard';

import s from './CoursesPage.module.scss';

export function CoursesPage() {
	const token = useUserState((state) => state.token);
	const tokenError = useUserState((state) => state.error);

	const {
		courses,
		currentPage,
		firstPageNumber,
		lastPageNumber,
		setCurrentPage,
		loading,
		error,
		fetchCourses,
	} = useCoursesState((state) => ({
		courses: state.courses,
		currentPage: state.currentPage,
		firstPageNumber: state.firstPageNumber,
		lastPageNumber: state.lastPageNumber,
		setCurrentPage: state.setCurrentPage,
		loading: state.loading,
		error: state.error,
		fetchCourses: state.fetchCourses,
	}));

	const navigate = useNavigate();
	const { pageNumber } = useParams();

	useEffect(() => {
		if (token) fetchCourses({ token });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		if (pageNumber) setCurrentPage(Number(pageNumber) - 1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePaginationSetCurrentPage = (curPage: number) => {
		setCurrentPage(curPage);
		navigate(`${ROUTES.COURSES}/${curPage + 1}`);
	};

	if (currentPage < firstPageNumber || currentPage > lastPageNumber) return <NotFoundPage />;

	if (error || tokenError) return <ErrorPlaceholder>{error || tokenError}</ErrorPlaceholder>;

	return (
		<Block component="main" className={s.CoursesPage}>
			<Grid container component="section" className={s.container}>
				{courses.length > 0 && (
					<>
						<Typography component="h2">Courses</Typography>
						<Grid row component="section" className={s.courses}>
							{
								courses[currentPage].map((course) => (
									<CourseCard
										key={course.id}
										id={course.id}
										title={course.title}
										previewImg={course.previewImageLink}
										video={course.videoLink}
										description={course.description}
										lessonsCount={course.lessonsCount}
										skills={course.skills}
										rating={course.rating}
										grid={{ xx: 6, md: 12 }}
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
			{loading === true && <LoaderOverlay />}
		</Block>
	);
}
