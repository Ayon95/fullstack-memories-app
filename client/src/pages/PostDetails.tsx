import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RootState } from '../redux/store';
import { Post } from '../utils/types';
import Layout from './../components/Layout/Layout';
import { formatDistanceToNow } from 'date-fns';
import stylesConfig from '../utils/stylesConfig';

function PostDetails() {
	const { id } = useParams<{ id: string }>();
	const post = useSelector((state: RootState) =>
		state.posts.postItems.find(post => post._id === id)
	) as Post;

	const currentUser = useSelector((state: RootState) => state.auth.user);

	function getPostAuthor() {
		if (post.author._id === currentUser?.userId) {
			return 'You';
		} else {
			return `${post.author.firstName} ${post.author.lastName}`;
		}
	}

	const likeCount = post.likedBy.length;
	return (
		<Layout>
			<PostDetailsContainer>
				<TextContent>
					<Tags>#{post.tags.join(' #')}</Tags>
					<Title>{post.title}</Title>
					<Author>
						Created By: <span style={{ fontWeight: 'bold' }}>{getPostAuthor()}</span>
					</Author>
					<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
					<Likes>
						{likeCount} {likeCount === 1 ? 'like' : 'likes'}
					</Likes>
					<PostDescription>{post.description}</PostDescription>
					<GoHomeLink to="/home">Go Home</GoHomeLink>
				</TextContent>
				<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
			</PostDetailsContainer>
		</Layout>
	);
}

export default PostDetails;

const detailsCommonStyle = css`
	font-size: 1.5rem;
	color: ${stylesConfig.colorGrey3};
`;

const PostDetailsContainer = styled.main`
	box-shadow: ${stylesConfig.shadowNormal};
	padding: 2rem;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-between;
`;
const PostImage = styled.img`
	border-radius: 0.5rem;
	box-shadow: ${stylesConfig.shadowThin};
	width: 100%;
	max-width: 64rem;
	height: 40rem;
	object-fit: cover;
`;
const TextContent = styled.div`
	width: 100%;
	max-width: 55ch;
	margin-right: 2rem;
`;
const Tags = styled.p`
	${detailsCommonStyle}
`;
const Title = styled.h1``;
const Author = styled.p`
	font-size: 1.8rem;
`;
const PostDescription = styled.p`
	margin: 2rem 0;
`;
const PostDate = styled.p`
	${detailsCommonStyle}
`;

const GoHomeLink = styled(Link)`
	:link,
	:visited,
	:active {
		text-decoration: none;
		color: ${stylesConfig.colorPrimaryLight1};
		padding-bottom: 0.3rem;
	}

	:hover {
		border-bottom: 1px solid currentColor;
	}
`;
const Likes = styled.p`
	${detailsCommonStyle}
`;
