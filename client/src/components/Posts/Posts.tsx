import React from 'react';
import { useSelector } from 'react-redux';
import Post from './PostItem';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import LoadingSpinner from '../Generic/LoadingSpinner';

function Posts() {
	const posts = useSelector((state: RootState) => state.posts.postItems);
	const postsStatus = useSelector((state: RootState) => state.posts.status);
	if (posts.length === 0) {
		return (
			<NoPostsContainer>
				<h2>No posts to display</h2>
			</NoPostsContainer>
		);
	}
	return (
		<PostsContainer>
			{postsStatus === 'pending' && <LoadingSpinner />}
			{posts && posts.map(post => <Post key={post._id} post={post} />)}
		</PostsContainer>
	);
}

export default Posts;

const PostsContainer = styled.section`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	margin-right: 2rem;
`;

const NoPostsContainer = styled.section`
	flex: 1;
	text-align: center;
`;
