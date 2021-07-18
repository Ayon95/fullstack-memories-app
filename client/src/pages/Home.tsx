import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import PostForm from '../components/Forms/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, getPostsBySearch } from '../redux/slices/posts/postsThunks';
import Layout from '../components/Layout/Layout';
import { RootState } from '../redux/store';
import SearchForm from '../components/Forms/SearchForm';
import { useLocation } from 'react-router-dom';

function Home() {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user!.token);
	const location = useLocation();

	useEffect(() => {
		// if there are no query params, then fetch all the posts
		if (!location.search) {
			dispatch(fetchAllPosts(token));
			return;
		}
		// wrapping the query string with the URLSearchParams API
		const query = new URLSearchParams(location.search);
		// getting the search term and tags from the query string (there will be at least one)
		const searchTerm = query.get('searchTerm') || '';
		const tags = query.get('tags') || '';
		dispatch(getPostsBySearch({ searchTerm, tags }));
	}, [dispatch, token, location]);
	return (
		<Layout>
			<HomeContainer>
				<Posts />
				<FormsContainer>
					<SearchForm />
					<PostForm />
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
