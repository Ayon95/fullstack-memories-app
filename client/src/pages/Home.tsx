import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import Form from '../components/Forms/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/posts/postsThunks';
import Layout from '../components/Layout/Layout';
import { RootState } from '../redux/store';

function Home() {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user!.token);
	useEffect(() => {
		dispatch(fetchAllPosts(token));
	}, [dispatch, token]);
	return (
		<Layout>
			<HomeContainer>
				<Posts />
				<Form />
			</HomeContainer>
		</Layout>
	);
}

export default Home;

const HomeContainer = styled.main`
	display: flex;
`;
