import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './CoursesPage.module.scss';

export function CoursesPage() {
	return (
		<Block component="main" className={s.CoursesPage}>
			<Grid container component="section" className={s.container}>
				<Typography component="h1">Курси 👋</Typography>
			</Grid>
		</Block>
	);
}
