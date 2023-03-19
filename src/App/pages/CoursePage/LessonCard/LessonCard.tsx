import asm from 'asm-ts-scripts';

import { ResizingContainer } from '~components/ResizingContainer/ResizingContainer';
import { useNavigateSearch } from '~hooks/useNavigateSearch';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Img } from '~/ameliance-ui/components/Img';
import { Typography } from '~/ameliance-ui/components/Typography';

import fallbackNoCover from '~assets/svg/no-cover.svg';

import s from './LessonCard.module.scss';

interface LessonCard {
	lessonNumber: string;
	title: string;
	previewImg: string;
	duration: string;
	unlocked: boolean;
	current: boolean;
	courseId: string;
	className?: string;
}

export function LessonCard({
	lessonNumber,
	title,
	previewImg,
	duration,
	unlocked,
	current,
	courseId,
	className,
}: LessonCard) {
	const navigateSearch = useNavigateSearch();

	const handleLessonClick = () => {
		navigateSearch('/course', { id: courseId, lesson: lessonNumber });
	};

	const componentClass = [
		current && s.current,
		!unlocked && s.disabled,
	];

	return (
		<Block
			onClick={handleLessonClick}
			className={asm.join(s.LessonCard, className, componentClass)}
		>
			<ResizingContainer className={s.imageContainer}>
				<Img
					className={s.previewImg}
					src={previewImg}
					alt={`Thumb ${title}`}
					fallbackScr={fallbackNoCover}
				/>
			</ResizingContainer>
			<Block className={s.textContent}>
				<Typography component="h5">{`${lessonNumber}. ${title}`}</Typography>
				<Block className={s.contentItem}>
					<Typography component="h6">Duration:</Typography>
					<Typography component="p2">{duration}</Typography>
				</Block>
			</Block>
			{!unlocked && (
				<Block className={s.lock}>
					<Typography component="p1" display="h4">LOCKED</Typography>
				</Block>
			)}
		</Block>
	);
}
