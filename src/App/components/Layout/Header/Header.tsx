import { Logo } from '~components/Logo';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';

import s from './Header.module.scss';

export function Header() {
	return (
		<Block component="header" className={s.Header}>
			<Grid container component="section" className={s.container}>
				<Logo />
			</Grid>
		</Block>
	);
}
