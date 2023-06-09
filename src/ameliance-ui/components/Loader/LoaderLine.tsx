import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './LoaderLine.module.scss';

type ComponentElementType = HTMLDivElement;

export interface LoaderLineProps extends ReactHTMLElementAttributes<ComponentElementType> {
	isInversion?: boolean;
}

export const LoaderLine = forwardRef<ComponentElementType, LoaderLineProps>(({
	isInversion,
	className,
	...rest
}, ref) => {
	const componentClass = [
		isInversion ? s.inversion : s.normal,
	];

	return (
		<div
			className={asm.join(s.LoaderLine, className, componentClass)}
			ref={ref}
			{...rest}
		>
			<div className={s.background} />
			<div className={s.animation} />
		</div>
	);
});

LoaderLine.displayName = 'LoaderLine';
