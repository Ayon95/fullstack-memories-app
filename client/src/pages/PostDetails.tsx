import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { Post } from '../utils/types';
import Layout from './../components/Layout/Layout';
import { formatDistanceToNow } from 'date-fns';

function PostDetails() {
	const { id } = useParams<{ id: string }>();
	const post = useSelector((state: RootState) =>
		state.posts.postItems.find(post => post._id === id)
	) as Post;

	const likeCount = post.likedBy.length;
	return (
		<Layout>
			<PostDetailsContainer>
				<TextContent>
					<Tags>#{post.tags.join(' #')}</Tags>
					<Title>{post.title}</Title>
					<Author>
						Created By: {post.author.firstName} {post.author.lastName}
					</Author>
					<PostDate>{formatDistanceToNow(new Date(post.createdAt))}</PostDate>
					<Likes>
						{likeCount} {likeCount === 1 ? 'like' : 'likes'}
					</Likes>
					<PostDescription>{post.description}</PostDescription>
				</TextContent>
				<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
			</PostDetailsContainer>
		</Layout>
	);
}

export default PostDetails;

const PostDetailsContainer = styled.main``;
const PostImage = styled.img``;
const TextContent = styled.div``;
const Tags = styled.p``;
const Title = styled.h1``;
const Author = styled.p``;
const PostDescription = styled.p``;
const PostDate = styled.p``;
const Likes = styled.p``;
