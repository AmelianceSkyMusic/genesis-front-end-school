import {
	createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import { Layout } from '~components/Layout';
import { StartScreen } from '~components/StartScreen/StartScreen';
import { CoursePage } from '~pages/CoursePage';
import { CoursesPage } from '~pages/CoursesPage';
import { NotFoundPage } from '~pages/NotFoundPage';

import { useAppInit } from './useAppInit';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />}>
		<Route index element={<CoursesPage />} />
		<Route path="courses/:pageNumber" element={<CoursesPage />} />
		<Route path="course" element={<CoursePage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Route>,
));

export function App() {
	const { isInit } = useAppInit();

	if (!isInit) return <StartScreen />;

	return <RouterProvider router={router} />;
}
