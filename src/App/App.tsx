import {
	createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import { Layout } from '~components/Layout';
import { CoursesPage } from '~pages/CoursesPage';
import { NotFoundPage } from '~pages/NotFoundPage';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />}>
		<Route index element={<CoursesPage />} />
	</Route>,
));

export function App() {
	return (
		<RouterProvider router={router} />
	);
}
