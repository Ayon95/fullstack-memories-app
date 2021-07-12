import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import Form from '../components/Forms/PostForm';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/posts/postsThunks';
import Layout from '../components/Layout/Layout';

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllPosts());
	}, [dispatch]);
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
