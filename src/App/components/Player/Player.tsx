import type { MouseEvent, VideoHTMLAttributes } from 'react';
import {
	forwardRef, useEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';
import Hls from 'hls.js';

import { appError } from '~helpers/appError';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './Player.module.scss';

const filePath = 'src/App/components/Player.tsx';

type ComponentElementType = HTMLVideoElement;

type Player = VideoHTMLAttributes<ComponentElementType>;

export const Player = forwardRef<ComponentElementType, Player>(({
	src,
	children,
	className,
	...rest
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
						switch (data.type) {
							case Hls.ErrorTypes.NETWORK_ERROR:
								appError(filePath, 'Fatal network error encountered, try to recover');
								setIsVideo(false);
								break;
							case Hls.ErrorTypes.MEDIA_ERROR:
								appError(filePath, 'Fatal media error encountered, try to recover');
								hls.recoverMediaError();
								break;
							default:
								hls.destroy();
								break;
						}
					}
				});
				hls.loadSource(src);
				hls.attachMedia(video);
			}
		}
	}, [src]);

	const handleOnMouseEnter = (event: MouseEvent<HTMLVideoElement>) => {
		event.currentTarget.play();
	};
	const handleOnMouseLeave = (event: MouseEvent<HTMLVideoElement>) => {
		event.currentTarget.pause();
	};

	return (
		<Block className={asm.join(s.playerContainer, className)}>
			{isVideo && (
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video
					className={s.video}
					ref={videoRef}
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
					{...rest}
				>
					{children}
				</video>
			)}
		</Block>
	);
});

Player.displayName = 'Player';
