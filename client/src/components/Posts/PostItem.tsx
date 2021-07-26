import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Post, User } from '../../utils/types';
import { FaTrashAlt, FaEdit, FaThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import stylesConfig from '../../utils/stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../redux/slices/posts/postsSlice';
import { deletePost, updateLikes } from './../../redux/slices/posts/postsThunks';
import IconTextButton from '../Generic/IconTextButton';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { getFormattedAuthorName, getFormattedDescription } from '../../utils/helpers';

type Props = { post: Post };

function PostItem({ post }: Props) {
	const currentUser = useSelector((state: RootState) => state.auth.user) as User;
	const { postItems: posts, currentPage } = useSelector((state: RootState) => state.posts);
	const dispatch = useDispatch();

	// we can use these two state variables to give instant feedback to the user (while the actual update of likes takes place in the backend)
	const [likeCount, setLikeCount] = useState(post.likedBy.length);
	const [isLiked, setIsLiked] = useState(post.likedBy.includes(currentUser.userId));

	function handleClickEdit() {
		dispatch(postsActions.setCurrentPostId(post._id));
	}

	function handleClickDelete() {
		let page = currentPage;
		// suppose the user is on the 2nd page which only has one post and the user deleted that post
		// then current page should be -> 2 - 1 = 1
		if (currentPage > 1 && posts.length === 1) page = currentPage - 1;
		dispatch(deletePost({ id: post._id, token: currentUser.token, page: page.toString() }));
	}

	function handleClickLike() {
		// if the post is already liked, then unlike the post
		if (isLiked) setLikeCount(prevState => prevState - 1);
		// if the post is not liked, then like the post
		if (!isLiked) setLikeCount(prevState => prevState + 1);
		setIsLiked(prevState => !prevState);
		// this will send a PATCH request and the server will update the likes of the post
		dispatch(updateLikes({ id: post._id, token: currentUser.token }));
	}

	return (
		<PostWrapper>
			<PostDetailsLink to={`/posts/${post._id}`} title="View Post Details">
				<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
				<PostContent>
					<PostInfo>
						<PostTags>#{post.tags.join(' #')}</PostTags>
						<PostTitle>{post.title}</PostTitle>
						<PostAuthor>
							Created By:{' '}
							<span style={{ fontWeight: 'bold' }}>
								{getFormattedAuthorName(post, currentUser)}
							</span>
						</PostAuthor>
						<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
						<PostLikes>
							{likeCount} {likeCount === 1 ? 'like' : 'likes'}
						</PostLikes>
						{post.comments.length > 0 && (
							<PostComments>
								{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
							</PostComments>
						)}
					</PostInfo>
					<PostDescription>{getFormattedDescription(post.description)}</PostDescription>
				</PostContent>
			</PostDetailsLink>
			<PostActions>
				<IconTextButton
					text={isLiked ? 'Unlike' : 'Like'}
					icon={isLiked ? FaThumbsDown : FaRegThumbsUp}
					color={stylesConfig.colorPrimary}
					handleClick={handleClickLike}
				/>

				{/* the user can edit or delete only their own posts */}
				{post.author._id === currentUser.userId && (
					<>
						<IconTextButton
							text="Edit"
							icon={FaEdit}
							color={stylesConfig.colorGrey3}
							handleClick={handleClickEdit}
						/>

						<IconTextButton
							text="Delete"
							icon={FaTrashAlt}
							color={stylesConfig.colorSecondary}
							handleClick={handleClickDelete}
						/>
					</>
				)}
			</PostActions>
		</PostWrapper>
	);
}

export default PostItem;

const detailsCommonStyle = css`
	font-size: 1.5rem;
	color: ${stylesConfig.colorGrey3};
`;

const PostDetailsLink = styled(Link)`
	:link,
	:visited,
	:active {
		text-decoration: none;
		color: ${stylesConfig.colorBlack};
		cursor: pointer;
	}
	/* works like horizontal auto margin because it's a flex item */
	margin-bottom: auto;
`;

const PostWrapper = styled.article`
	border-radius: 1rem;
	max-height: 60rem;
	overflow: hidden;
	box-shadow: ${stylesConfig.shadowThin};
	display: flex;
	flex-direction: column;
`;

const PostImage = styled.img`
	width: 100%;
	height: 20rem;
	object-fit: cover;
`;

const PostContent = styled.div`
	padding: 0 2rem;
	margin-top: 2rem;
`;

const PostInfo = styled.div`
	margin-bottom: 2rem;
`;

const PostTags = styled.p`
	${detailsCommonStyle}
	margin-bottom: 2rem;
`;

const PostTitle = styled.h3`
	font-size: 2.2rem;
	margin: 0.5rem 0;
`;

const PostAuthor = styled.p``;

const PostDate = styled.p`
	${detailsCommonStyle}
`;

const PostLikes = styled.p`
	${detailsCommonStyle}
`;

const PostComments = styled.p`
	${detailsCommonStyle}
`;

const PostDescription = styled.p``;

const PostActions = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem 2rem 2rem;
	margin-top: 2rem;
`;
