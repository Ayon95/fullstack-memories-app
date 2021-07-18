import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { postsActions } from '../../redux/slices/posts/postsSlice';
import { RootState } from '../../redux/store';
import stylesConfig from '../../utils/stylesConfig';
import PageButton from './PageButton';

function Pagination() {
	const totalNumPages = useSelector((state: RootState) => state.posts.totalNumPages);
	const currentPage = useSelector((state: RootState) => state.posts.currentPage);
	const dispatch = useDispatch();

	let pageNumbers: number[] = [];
	for (let i = 0; i < totalNumPages; i++) pageNumbers.push(i + 1);

	function handleClickChangePage(pageNumber: number) {
		dispatch(postsActions.setCurrentPage(pageNumber));
	}

	function handleClickNextPage() {
		// if the user is on the last page, then go to the first page
		if (currentPage === totalNumPages) {
			return dispatch(postsActions.setCurrentPage(1));
		}

		dispatch(postsActions.setCurrentPage(currentPage + 1));
	}

	function handleClickPrevPage() {
		// if the user is on the first page, then go to the last page
		if (currentPage === 1) {
			return dispatch(postsActions.setCurrentPage(totalNumPages));
		}

		dispatch(postsActions.setCurrentPage(currentPage - 1));
	}
	return (
		<PaginationContainer>
			<PageButton text="&laquo;" handleClick={handleClickPrevPage} />
			{pageNumbers.map(pageNumber => (
				<PageButton
					key={pageNumber}
					text={pageNumber.toString()}
					isCurrentPage={currentPage === pageNumber}
					handleClick={() => handleClickChangePage(pageNumber)}
				/>
			))}
			<PageButton text="&raquo;" handleClick={handleClickNextPage} />
		</PaginationContainer>
	);
}

export default Pagination;

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	row-gap: 0.5rem;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: ${stylesConfig.shadowThin};
`;
