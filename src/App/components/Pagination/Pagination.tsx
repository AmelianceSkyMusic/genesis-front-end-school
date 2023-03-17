import { useEffect, useState } from 'react';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { ChevronLeftIcon } from '~/ameliance-ui/components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '~/ameliance-ui/components/icons/ChevronRightIcon';
import { ChevronsLeftIcon } from '~/ameliance-ui/components/icons/ChevronsLeftIcon';
import { ChevronsRightIcon } from '~/ameliance-ui/components/icons/ChevronsRightIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './Pagination.module.scss';

interface Pagination {
	setCurrentPage: (arg: number) => void;
	currentPageNumber: number;
	firstPageNumber: number;
	lastPageNumber: number;
}

export function Pagination({
	setCurrentPage,
	currentPageNumber,
	firstPageNumber,
	lastPageNumber,
}: Pagination) {
	const [canMoveBack, setCanMoveBack] = useState(false);
	const [canMoveForward, setCanMoveForward] = useState(false);

	useEffect(() => {
		setCanMoveBack(false);
		setCanMoveForward(false);
		if (currentPageNumber <= firstPageNumber) {
			setCanMoveBack(true);
		} else if (currentPageNumber >= lastPageNumber) {
			setCanMoveForward(true);
		}
	}, [currentPageNumber, firstPageNumber, lastPageNumber]);

	const handlePrevPageClick = () => {
		if (currentPageNumber > firstPageNumber) {
			setCurrentPage(currentPageNumber - 1);
		}
	};

	const handleNextPageClick = () => {
		if (currentPageNumber < lastPageNumber) {
			setCurrentPage(currentPageNumber + 1);
		}
	};

	const handleFirstPageClick = () => {
		setCurrentPage(firstPageNumber);
	};

	const handleLastPageClick = () => {
		setCurrentPage(lastPageNumber);
	};

	return (
		<Block className={s.Pagination}>
			<Button type="secondary" disabled={canMoveBack} className={s.button} onClick={handleFirstPageClick}><ChevronsLeftIcon /></Button>
			<Button type="secondary" disabled={canMoveBack} className={s.button} onClick={handlePrevPageClick}><ChevronLeftIcon /></Button>
			<Block className={s.pages}>
				<Typography component="p1" display="h5">{currentPageNumber + 1}</Typography>
				<Typography component="p1">/</Typography>
				<Typography component="p1">{lastPageNumber + 1}</Typography>
			</Block>
			<Button type="secondary" disabled={canMoveForward} className={s.button} onClick={handleNextPageClick}><ChevronRightIcon /></Button>
			<Button type="secondary" disabled={canMoveForward} className={s.button} onClick={handleLastPageClick}><ChevronsRightIcon /></Button>
		</Block>
	);
}
