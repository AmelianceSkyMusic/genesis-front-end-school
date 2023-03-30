import type { ReactNode } from 'react';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './ErrorPlaceholder.module.scss';

interface ErrorPlaceholder {
	children: ReactNode;
}

export function ErrorPlaceholder({ children }: ErrorPlaceholder) {
	return (
		<Block component="main" className={s.ErrorPlaceholder}>
			<Grid container component="section" className={s.container}>
				<Typography component="h4">ERROR:</Typography>
				<Typography component="p1">{children}</Typography>
			</Grid>
		</Block>
	);
}
