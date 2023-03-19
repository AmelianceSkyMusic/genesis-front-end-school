import {
	createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import { Layout } from '~components/Layout';
import { CoursePage } from '~pages/CoursePage';
import { CoursesPage } from '~pages/CoursesPage';
import { NotFoundPage } from '~pages/NotFoundPage';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />}>
		<Route index element={<CoursesPage />} />
		<Route path="courses/:pageNumber" element={<CoursesPage />} />
		<Route path="course" element={<CoursePage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Route>,
));

export function App() {
	return (
		<RouterProvider router={router} />
	);
}
