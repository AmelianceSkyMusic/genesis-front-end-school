import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Link } from '~/ameliance-ui/components/Link';

import s from './Footer.module.scss';

export function Footer() {
	return (
		<Block component="footer" className={s.Footer}>
			<Grid container className={s.container}>
				<Link href="https://github.com/AmelianceSkyMusic" blank>
					Ameliance SkyMusic
				</Link>
			</Grid>
		</Block>
	);
}
