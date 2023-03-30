import asm from 'asm-ts-scripts';

import { ResizingContainer } from '~components/ResizingContainer/ResizingContainer';
import { toTimeString } from '~helpers/toTimeString';
import type { Lesson } from '~store/useCourseState';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Img } from '~/ameliance-ui/components/Img';
import { Typography } from '~/ameliance-ui/components/Typography';

import fallbackNoCover from '~assets/svg/no-cover.svg';

import s from './LessonCard.module.scss';

interface LessonCardProps {
	lesson: Lesson;
	current: boolean;
	onClick: (number: number, id: string) => void;
	className?: string;
}

export function LessonCard({
	lesson,
	current,
	onClick,
	className,
}: LessonCardProps) {
	const componentClass = [
		current && s.current,
		!lesson.unlocked && s.disabled,
	];

	const handleVideoOnClick = () => {
		if (!current) onClick(lesson.order || 1, lesson.id || '');
	};

	return (
		<Block
			onClick={handleVideoOnClick}
			className={asm.join(s.LessonCard, className, componentClass)}
		>
			<ResizingContainer className={s.imageContainer}>
				<Img
					className={s.previewImg}
					src={lesson.previewImageLink || ''}
					alt={`Thumb ${lesson.title}`}
					fallbackScr={fallbackNoCover}
				/>
			</ResizingContainer>
			<Block className={s.textContent}>
				<Typography component="h5">{`${lesson.order}. ${lesson.title}`}</Typography>
				{lesson.duration && (
					<Block className={s.contentItem}>
						<Typography component="h6">Duration:</Typography>
						<Typography component="p2">{toTimeString(lesson.duration)}</Typography>
					</Block>
				)}
			</Block>
			{!lesson.unlocked && (
				<Block className={s.lock}>
					<Typography component="p1" display="h4">LOCKED</Typography>
				</Block>
			)}
		</Block>
	);
}
