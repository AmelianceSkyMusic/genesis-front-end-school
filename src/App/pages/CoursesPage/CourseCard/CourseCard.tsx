import { useState } from 'react';

import asm from 'asm-ts-scripts';

import { ResizingContainer } from '~components/ResizingContainer/ResizingContainer';
import { asmJoinWith } from '~helpers/asmJoinWith';
import { useNavigateSearch } from '~hooks/useNavigateSearch';

import type { BlockProps } from '~/ameliance-ui/components/blocks/Block';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { ButtonLink } from '~/ameliance-ui/components/Button';
import { Img } from '~/ameliance-ui/components/Img';
import { Typography } from '~/ameliance-ui/components/Typography';

import { CardPlayer } from './CardPlayer/CardPlayer';

import s from './CourseCard.module.scss';

interface CourseCardProps extends BlockProps {
	id: string;
	title: string;
	description: string;
	previewImg: string;
	video: string;
	lessonsCount: number;
	skills: string[] | null;
	rating: number | null;
	className?: string;
}

export function CourseCard({
	id, title, description, previewImg, video, lessonsCount, skills, rating, className, grid,
}: CourseCardProps) {
	const [showImg, setShowImg] = useState(true);

	const navigateSearch = useNavigateSearch();

	const handleLessonClick = () => {
		navigateSearch('/course', { id, lesson: '1' });
	};

	return (
		<Block className={asm.join(s.CourseCard, className)} grid={grid}>
			<ButtonLink
				onClick={handleLessonClick}
				onMouseEnter={() => setShowImg(false)}
				onMouseLeave={() => setShowImg(true)}
				customStyle
			>
				<ResizingContainer className={s.playerContainer}>
					<CardPlayer
						className={s.player}
						src={video}
						fallbackSrc={previewImg}
						preload="metadata"
						loop
						muted
					/>
					<Img
						style={{ visibility: showImg ? 'visible' : 'hidden' }}
						className={s.previewImg}
						src={previewImg}
						alt={`Thumb ${title}`}
					/>
				</ResizingContainer>
			</ButtonLink>
			<Block className={s.textContent}>
				<Typography component="h4">{title}</Typography>
				<Typography component="p1">{description}</Typography>
				<Block className={s.detailsContent}>
					<Typography component="p1">
						<b>Lessons: </b>
						{lessonsCount}
					</Typography>
					<Typography component="p1">
						<b>Rating: </b>
						{`${rating} / 5`}
					</Typography>
					{skills && skills?.length > 0 && (
						<Typography component="p1">
							<b>Skills: </b>
							{asmJoinWith(', ', skills)}
						</Typography>
					)}
				</Block>
			</Block>
		</Block>
	);
}
