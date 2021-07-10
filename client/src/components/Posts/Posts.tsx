import React from 'react';
import { useSelector } from 'react-redux';
import Post from './PostItem';
import { RootState } from '../../redux/store';
import styled from 'styled-components';

function Posts() {
	const posts = useSelector((state: RootState) => state.posts.postItems);
	return (
		<PostsContainer>
			{posts.map(post => (
				<Post key={post._id} post={post} />
			))}
		</PostsContainer>
	);
}

export default Posts;

const PostsContainer = styled.section`
	margin-right: 2rem;
`;
