import React from 'react';
import { useSelector } from 'react-redux';
import Post from './PostItem';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import LoadingSpinner from '../Generic/LoadingSpinner';
import stylesConfig from '../../utils/stylesConfig';

function Posts() {
	const posts = useSelector((state: RootState) => state.posts.postItems);
	const postsStatus = useSelector((state: RootState) => state.posts.status);

	if (posts.length === 0 && postsStatus !== 'pending') {
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
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, 30rem);
	gap: 2rem;
	margin-right: 2rem;

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		margin-right: 0;
		margin-top: 2rem;
		justify-content: center;
	}
`;

const NoPostsContainer = styled.section`
	flex: 1;
	text-align: center;
`;
