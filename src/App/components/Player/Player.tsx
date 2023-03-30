import type { VideoHTMLAttributes } from 'react';
import {
	forwardRef, useEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';
import Hls from 'hls.js';

import { appError } from '~helpers/appError';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Img } from '~/ameliance-ui/components/Img';
import { mergeRefs } from '~/ameliance-ui/helpers/mergeRefs';

import s from './Player.module.scss';

const filePath = 'src/App/components/Player.tsx';

type ComponentElementType = HTMLVideoElement;

interface Player extends VideoHTMLAttributes<ComponentElementType> {
	fallbackSrc?: string;
	currentTime?: number;
}

export const Player = forwardRef<ComponentElementType, Player>(({
	src,
	fallbackSrc,
	currentTime,
	children,
	className,
	...rest
}: Player, ref) => {
	const [isVideo, setIsVideo] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current && src) {
			const video = videoRef.current;
			if (Hls.isSupported()) {
				const hls = new Hls({ enableWorker: false });
				hls.on(Hls.Events.ERROR, (_event, data) => {
					if (data.fatal) {
						setIsVideo(false);
						switch (data.type) {
							case Hls.ErrorTypes.NETWORK_ERROR:
								appError(filePath, 'Fatal network error encountered, try to recover');
								break;
							case Hls.ErrorTypes.MEDIA_ERROR:
								appError(filePath, 'Fatal media error encountered, try to recover');
								hls.recoverMediaError();
								break;
							default:
								appError(filePath, 'Fatal player error');
								hls.destroy();
								break;
						}
					}
				});
				hls.loadSource(src);
				hls.attachMedia(video);
				if (currentTime) videoRef.current.currentTime = currentTime;
			}
		} else {
			setIsVideo(false);
		}
	}, [currentTime, src]);

	return (
		<>
			{isVideo && (
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video
					className={asm.join(s.Player, className)}
					ref={mergeRefs([ref, videoRef])}
					{...rest}
				>
					{children}
				</video>
			)}
			{!isVideo && fallbackSrc && <Img className={asm.join(s.fallback, className)} src={fallbackSrc} alt="fallback" />}
			{!isVideo && !fallbackSrc && <Block className={asm.join(s.emptyBlock, className)} />}
		</>
	);
});

Player.displayName = 'Player';
