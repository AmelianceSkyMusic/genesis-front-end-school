import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import type { Grid } from './helpers/grid';
import { getGridClass } from './helpers/grid';

type ComponentElementType = HTMLElement;

export interface SectionProps extends ReactHTMLElementAttributes<ComponentElementType> {
	container?: boolean;
	gridContainer?: boolean;
	grid?: Grid;
}

export const Section = forwardRef<ComponentElementType, SectionProps>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		grid && getGridClass(grid),
	];

	return (
		<section
			className={asm.join(className, gridContainer && 'row', componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</section>
	);
});

Section.displayName = 'Section';
