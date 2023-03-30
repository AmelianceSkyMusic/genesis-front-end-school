import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Player } from '~components/Player/Player';
import { ResizingContainer } from '~components/ResizingContainer/ResizingContainer';
import { toTimeString } from '~helpers/toTimeString';
import type { Lesson } from '~store/useCourseState';

import { Backdrop } from '~/ameliance-ui/components/Backdrop';
import type { BlockProps } from '~/ameliance-ui/components/blocks/Block';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Img } from '~/ameliance-ui/components/Img';
import { Typography } from '~/ameliance-ui/components/Typography';
import { useScrollLock } from '~/ameliance-ui/hooks/useScrollLock';

import { VideoHelp } from './VideoHelp/VideoHelp';

import fallbackNoCover from '~assets/svg/no-cover.svg';
import fallbackNotAvailable from '~assets/svg/not-available.svg';

import s from './CurrentLesson.module.scss';

interface CurrentLessonProps extends BlockProps {
	lesson: Lesson;
	currentTime?: number;
	onCurrentTimeChange: (time: number) => void;
	className?: string;
}

export function CurrentLesson({
	lesson,
	currentTime,
	onCurrentTimeChange,
	grid,
	className,
}: CurrentLessonProps) {
	const playerRef = useRef<HTMLVideoElement>(null);
	const [showVideo, setShowVideo] = useState(false);
	const [videoSpeed, setVideoSpeed] = useState(1);

	const setVideoSpeedTrunc = (speed: number) => {
		setVideoSpeed(Math.round(speed * 10) / 10);
	};

	const { lockScroll, unlockScroll } = useScrollLock();

	const handleLessonOnClick = () => {
		lockScroll();
		setShowVideo(true);
		setVideoSpeed(1);
	};

	const handleBackdropOnClick = () => {
		unlockScroll();
		setShowVideo(false);
		if (playerRef.current) onCurrentTimeChange(Math.trunc(playerRef.current.currentTime));
	};

	const handlePlayerKeyUp = (event: KeyboardEvent<HTMLVideoElement>) => {
		event.preventDefault();
		if (event.code === 'Minus' && videoSpeed > 0.2) setVideoSpeedTrunc(videoSpeed - 0.2);
		if (event.code === 'Equal' && videoSpeed < 4) setVideoSpeedTrunc(videoSpeed + 0.2);
		if (event.code === 'Digit0') setVideoSpeedTrunc(1);
	};

	useEffect(() => {
		if (playerRef?.current) playerRef.current.playbackRate = videoSpeed;
	}, [videoSpeed]);

	const handleOnMinusClick = () => {
		if (videoSpeed > 0.2) setVideoSpeedTrunc(videoSpeed - 0.2);
	};
	const handleOnEqualClick = () => {
		if (videoSpeed < 4) setVideoSpeedTrunc(videoSpeed + 0.2);
	};
	const handleOnZeroClick = () => {
		setVideoSpeedTrunc(1);
	};

	return (
		<Block className={asm.join(s.CurrentLesson, className)} grid={grid}>
			<ResizingContainer className={s.imageContainer}>
				<Img
					className={s.previewImg}
					src={lesson.previewImageLink || ''}
					alt={`Thumb ${lesson.title}`}
					fallbackScr={fallbackNoCover}
					onClick={handleLessonOnClick}
				/>
			</ResizingContainer>
			<Block className={s.textContent}>
				<Typography component="h4">{`${lesson.order || 1}. ${lesson.title}`}</Typography>
				{lesson.duration && (
					<Block className={s.contentItem}>
						<Typography component="h5">Duration:</Typography>
						<Typography component="p1">{toTimeString(lesson.duration)}</Typography>
					</Block>
				)}
			</Block>
			{showVideo && lesson.videoLink && (
				<Block className={s.videoLesson}>
					<Backdrop show={showVideo} onClick={handleBackdropOnClick} className={s.backdrop} />
					<Player
						className={s.player}
						src={lesson.videoLink}
						fallbackSrc={fallbackNotAvailable}
						preload="metadata"
						currentTime={currentTime}
						controls
						onKeyUp={handlePlayerKeyUp}
						ref={playerRef}
					/>
					<VideoHelp
						className={s.videoHelp}
						currentSpeed={videoSpeed}
						onMinusClick={handleOnMinusClick}
						onEqualClick={handleOnEqualClick}
						onZeroClick={handleOnZeroClick}
					/>
				</Block>
			)}
		</Block>
	);
}
