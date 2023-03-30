import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './NotFoundPage.module.scss';

export function NotFoundPage() {
	return (
		<Block component="main">
			<Grid container component="section" className={s.container}>
				<Block className={s.title}>
					<Typography component="p1" display="h1" className={s.title40}>40</Typography>
					<Typography component="p1" display="h1" className={s.title4}>4</Typography>
				</Block>
				<Block className={s.description}>
					<Typography component="p2">
						Page not found
						<br />
						¯\_(ツ)_/¯
					</Typography>
				</Block>
			</Grid>
		</Block>
	);
}
