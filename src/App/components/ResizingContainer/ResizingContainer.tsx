import type { ReactNode } from 'react';

import asm from 'asm-ts-scripts';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './ResizingContainer.module.scss';

interface ResizingContainer {
	width?: number | string;
	className?: string;
	children: ReactNode;
}

export function ResizingContainer({ width, className, children }: ResizingContainer) {
	const customSizeStyle = width ? { width } : {};

	return (
		<Block className={asm.join(s.ResizingContainer, className)} style={{ ...customSizeStyle }}>
			<Block className={s.outer}>
				<Block className={s.inner}>
					{children}
				</Block>
			</Block>
		</Block>
	);
}
