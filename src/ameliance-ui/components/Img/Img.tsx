import type { SyntheticEvent } from 'react';
import { forwardRef, useState } from 'react';

type ComponentElementType = HTMLImageElement;

interface Img extends ReactHTMLElementAttributes<
ComponentElementType, React.ImgHTMLAttributes<ComponentElementType>> {
	fallbackScr?: string;
	src: string;
	alt: string;
}

export const Img = forwardRef<ComponentElementType, Img>(({
	className,
	src,
	alt,
	fallbackScr,
	onError,
	...rest
}, ref) => {
	const [imgSrc, setImgSrc] = useState(src);

	const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		if (fallbackScr) setImgSrc(fallbackScr);
		if (onError) onError(event);
	};

	return (
		<img
			className={className}
			src={imgSrc}
			alt={alt}
			onError={imageOnErrorHandler}
			ref={ref}
			{...rest}
		/>
	);
});

Img.displayName = 'Img';
