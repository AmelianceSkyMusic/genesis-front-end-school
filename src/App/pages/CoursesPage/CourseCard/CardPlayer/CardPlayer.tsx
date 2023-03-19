import type { MouseEvent } from 'react';
import { useRef, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Player } from '~components/Player/Player';
import { appError } from '~helpers/appError';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './CardPlayer.module.scss';

const filePath = 'src/App/pages/CoursesPage/CourseCard/CardPlayer/CardPlayer.tsx';

interface CardPlayer {
	src: string;
	fallbackSrc: string;
	preload: string;
	loop: boolean;
	muted: boolean;
	className?: string;
}

export function CardPlayer({
	src,
	fallbackSrc,
	preload,
	loop,
	muted,
	className,
}: CardPlayer) {
	const [isVideoValid, setIsVideoValid] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleOnMouseEnter = (event: MouseEvent<HTMLVideoElement>) => {
		const playPromise = event.currentTarget.play();

		if (playPromise !== undefined) {
			playPromise.then().catch(() => {
				appError(filePath, `Can't play video. Check link: ${src}`);
				setIsVideoValid(false);
			});
		}
	};

	const handleOnMouseLeave = (event: MouseEvent<HTMLVideoElement>) => {
		event.currentTarget.pause();
	};

	return (
		<Block className={asm.join(s.CardPlayer, className)}>
			<Player
				className={s.player}
				src={isVideoValid ? src : ''}
				fallbackSrc={fallbackSrc}
				preload={preload}
				loop={loop}
				muted={muted}
				ref={videoRef}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
			/>
		</Block>
	);
}
