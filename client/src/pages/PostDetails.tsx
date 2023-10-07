import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RootState } from '../redux/store';
import { User } from '../utils/types';
import Layout from './../components/Layout/Layout';
import { formatDistanceToNow } from 'date-fns';
import stylesConfig from '../utils/stylesConfig';
import RecommendedPosts from '../components/Posts/RecommendedPosts';
import { useEffect } from 'react';
import { getPost, getPostsBySearch } from '../redux/slices/posts/postsThunks';
import { getFormattedAuthorName } from '../utils/helpers';
import LoadingSpinner from '../components/Generic/LoadingSpinner';
import Comments from '../components/Comments/Comments';

function PostDetails() {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>();
	const { detailedPost: post, status, postItems } = useSelector((state: RootState) => state.posts);
	const currentUser = useSelector((state: RootState) => state.auth.user) as User;

	// here we are filtering out the post itself (we only want other posts that are related to it)
	const recommendedPosts = postItems?.filter(
		postItem =>
			postItem._id !== id &&
			postItem.author._id !== currentUser!.userId &&
			postItem.tags.some(tag => post?.tags.includes(tag))
	);

	console.log(postItems);

	// get the post whose details page the user wants to see
	useEffect(() => {
		dispatch(getPost({ token: currentUser.token, id }));
	}, [dispatch, currentUser.token, id]);

	// get the related posts (posts that have tags in common with this post)
	useEffect(() => {
		if (!post) return;
		dispatch(
			getPostsBySearch({
				token: currentUser.token,
				searchTerm: 'none',
				tags: post.tags.join(','),
			})
		);
	}, [post, currentUser.token, dispatch]);

	return (
		<Layout>
			{status === 'pending' && <LoadingSpinner />}
			{status !== 'pending' && post && (
				<PostDetailsContainer>
					<TextContent>
						<Tags>#{post.tags.join(' #')}</Tags>
						<Title>{post.title}</Title>
						<Author>
							Created By:{' '}
							<span style={{ fontWeight: 'bold' }}>
								{getFormattedAuthorName(post, currentUser)}
							</span>
						</Author>
						<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
						<Likes>
							{post.likedBy.length} {post.likedBy.length === 1 ? 'like' : 'likes'}
						</Likes>
						<PostDescription>{post.description}</PostDescription>
						<Comments />
						<GoHomeLink to="/home">Go Home</GoHomeLink>
					</TextContent>
					<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
				</PostDetailsContainer>
			)}
			{status !== 'pending' && recommendedPosts.length > 0 && (
				<RecommendedPosts posts={recommendedPosts} />
			)}
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
	margin-bottom: 2rem;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-between;

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		flex-direction: column;
		flex-flow: column-reverse;
	}
`;
const PostImage = styled.img`
	border-radius: 0.5rem;
	box-shadow: ${stylesConfig.shadowThin};
	width: 50%;
	max-width: 64rem;
	max-height: 40rem;
	object-fit: cover;

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		margin-bottom: 1rem;
		width: 100%;
		max-width: none;
	}
`;
const TextContent = styled.div`
	width: 100%;
	max-width: 55ch;
	margin-right: 2rem;
`;
const Tags = styled.p`
	${detailsCommonStyle}
`;
const Title = styled.h1`
	font-size: 3.6rem;
`;
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
