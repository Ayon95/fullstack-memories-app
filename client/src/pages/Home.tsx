import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/posts/postsThunks';

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllPosts());
	}, [dispatch]);
	return (
		<HomeContainer>
			<Posts />
			<Form />
		</HomeContainer>
	);
}

export default Home;

const HomeContainer = styled.main`
	display: flex;
`;
