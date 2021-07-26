import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import PostForm from '../components/Forms/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../redux/slices/posts/postsThunks';
import Layout from '../components/Layout/Layout';
import { RootState } from '../redux/store';
import SearchForm from '../components/Forms/SearchForm';
import Pagination from '../components/Pagination/Pagination';
import stylesConfig from '../utils/stylesConfig';
import { useLocation } from 'react-router-dom';

function Home() {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user!.token);
	const totalNumPages = useSelector((state: RootState) => state.posts.totalNumPages);
	const currentPage = useSelector((state: RootState) => state.posts.currentPage);

	let queryParams: URLSearchParams | null = null;

	const location = useLocation();

	// checking if there is a query string in the url
	if (location.search) queryParams = new URLSearchParams(location.search);

	useEffect(() => {
		if (queryParams) {
			const searchTerm = queryParams.get('searchTerm') as string;
			const tags = queryParams.get('tags') as string;
			dispatch(getPostsBySearch({ token, searchTerm, tags }));
			return;
		}
		dispatch(getPosts({ token, page: currentPage.toString() }));
	}, [dispatch, token, currentPage, queryParams]);
	return (
		<Layout>
			<HomeContainer>
				<Posts />
				<FormsContainer>
					<SearchForm />
					<PostForm />
					{totalNumPages > 1 && <Pagination />}
				</FormsContainer>
			</HomeContainer>
		</Layout>
	);
}

export default Home;

const HomeContainer = styled.main`
	display: flex;

	@media only screen and (max-width: ${stylesConfig.bpLarge}) {
		justify-content: space-between;
	}

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		flex-direction: column;
		flex-flow: column-reverse;
	}
`;

const FormsContainer = styled.div`
	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		align-self: center;
	}
	@media only screen and (max-width: ${stylesConfig.bpExtraSmall}) {
		max-width: 100%;
	}
`;
