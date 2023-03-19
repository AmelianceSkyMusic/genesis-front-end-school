import asm from 'asm-ts-scripts';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './VideoHelp.module.scss';

interface VideoHelp {
	currentSpeed: number;
	onMinusClick: () => void;
	onEqualClick: () => void;
	onZeroClick: () => void;
	className: string;
}

export function VideoHelp({
	currentSpeed, onMinusClick, onEqualClick, onZeroClick, className,
}: VideoHelp) {
	return (
		<Block className={asm.join(s.VideoHelp, className)}>
			<Block className={s.container}>
				<Typography component="p2" className={s.text}>Current speed:</Typography>
				<Typography component="p1" className={s.text}>{currentSpeed}</Typography>
			</Block>
			<Block className={s.container}>
				<Button className={s.text} onClick={onMinusClick}>-</Button>
				<Typography component="p2" className={s.text}>— increase </Typography>
			</Block>
			<Block className={s.container}>
				<Button className={s.text} onClick={onEqualClick}>=</Button>
				<Typography component="p2" className={s.text}>— decrease</Typography>
			</Block>
			<Block className={s.container}>
				<Button className={s.text} onClick={onZeroClick}>0</Button>
				<Typography component="p2" className={s.text}>— reset</Typography>
			</Block>
		</Block>
	);
}
