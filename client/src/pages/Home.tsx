import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import PostForm from '../components/Forms/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/slices/posts/postsThunks';
import Layout from '../components/Layout/Layout';
import { RootState } from '../redux/store';
import SearchForm from '../components/Forms/SearchForm';
import Pagination from '../components/Pagination/Pagination';

function Home() {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user!.token);
	const totalNumPages = useSelector((state: RootState) => state.posts.totalNumPages);
	const currentPage = useSelector((state: RootState) => state.posts.currentPage);

	useEffect(() => {
		dispatch(getPosts({ token, page: currentPage.toString() }));
	}, [dispatch, token, currentPage]);
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
`;

const FormsContainer = styled.div``;
