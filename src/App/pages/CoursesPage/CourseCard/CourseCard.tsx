import { useState } from 'react';
import { Link } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { Player } from '~components/Player/Player';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './CourseCard.module.scss';

interface CourseCard {
	id: string;
	title: string;
	description: string;
	previewImg: string;
	video: string;
	lessonsCount: number;
	skills: string[];
	rating: number;
	className: string;
}

export function CourseCard({
	id, title, description, previewImg, video, lessonsCount, skills, rating, className,
}: CourseCard) {
	const [showImg, setShowImg] = useState(true);

	return (
		<Block className={asm.join(s.CourseCard, className)}>
			<Link
				to={`/course/${id}`}
				className={s.playerContainer}
				onMouseEnter={() => setShowImg(false)}
				onMouseLeave={() => setShowImg(true)}
			>
				{video && (
					<Player
						className={s.player}
						src={video}
						poster={`${previewImg}/cover.webp`}
						preload="metadata"
						loop
						muted
					/>
				)}
				<img
					style={{ visibility: showImg ? 'visible' : 'hidden' }}
					className={s.previewImg}
					src={`${previewImg}/cover.webp`}
					alt={`Thumb ${title}`}
				/>
			</Link>
			<Block className={s.textContent}>
				<Typography component="h4">{title}</Typography>
				<Typography component="p1">{description}</Typography>
				<Block className={s.detailsContent}>
					<Block className={s.contentItem}>
						<Typography component="h5">Lessons:</Typography>
						<Typography component="p1">{lessonsCount}</Typography>
					</Block>
					<Block className={s.contentItem}>
						<Typography component="h5">Skills:</Typography>
						<Typography component="p1">{skills.join(', ')}</Typography>
					</Block>
					<Block className={s.contentItem}>
						<Typography component="h5">Rating:</Typography>
						<Typography component="p1">{rating}</Typography>
					</Block>
				</Block>
			</Block>
		</Block>
	);
}
