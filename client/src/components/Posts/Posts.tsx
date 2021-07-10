import React from 'react';
import { useSelector } from 'react-redux';
import Post from './PostItem';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import LoadingSpinner from '../generic/LoadingSpinner';

function Posts() {
	const posts = useSelector((state: RootState) => state.posts.postItems);
	const postsStatus = useSelector((state: RootState) => state.posts.status);
	return (
		<PostsContainer>
			{postsStatus === 'pending' && <LoadingSpinner />}
			{posts && posts.map(post => <Post key={post._id} post={post} />)}
		</PostsContainer>
	);
}

export default Posts;

const PostsContainer = styled.section`
	flex: 3;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 2rem;
	margin-right: 2rem;
`;
