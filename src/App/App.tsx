import { Route, Routes } from 'react-router-dom';

import { Layout } from '~components/Layout';
import { CoursesPage } from '~pages/CoursesPage';

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<CoursesPage />} />
			</Route>
		</Routes>
	);
}
