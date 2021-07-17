import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { Post, User } from '../../utils/types';
import { FaTrashAlt, FaEdit, FaThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import stylesConfig from '../../utils/stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../redux/slices/posts/postsSlice';
import { useState } from 'react';
import { deletePost, updateLikes } from './../../redux/slices/posts/postsThunks';
import IconTextButton from '../Generic/IconTextButton';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

type Props = { post: Post };

function PostItem({ post }: Props) {
	const [isLiked, setIsLiked] = useState(false);
	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.auth.user) as User;
	const likeCount = post.likedBy.length;

	// check if the post is already liked by the current user
	useEffect(() => {
		if (post.likedBy.includes(currentUser.userId)) {
			setIsLiked(true);
		}
	}, [currentUser, post]);

	function handleClickEdit() {
		dispatch(postsActions.setCurrentPostId(post._id));
	}

	function handleClickDelete() {
		dispatch(deletePost({ id: post._id, token: currentUser.token }));
	}

	function handleClickLike() {
		// this will send a PATCH request and the server will update the likes of the post
		dispatch(updateLikes({ id: post._id, token: currentUser.token }));

		// if the post is already liked, then unlike the post
		// if the post is not liked, then like the post
		setIsLiked(prevState => !prevState);
	}

	function isUserOwnPost() {
		return post.author._id === currentUser.userId;
	}

	function setPostAuthor() {
		if (isUserOwnPost()) {
			return 'You';
		} else {
			return `${post.author.firstName} ${post.author.lastName}`;
		}
	}
	return (
		<PostWrapper>
			<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
			<PostContent>
				<PostInfo>
					<PostTags>{post.tags}</PostTags>
					<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
					<PostTitle>{post.title}</PostTitle>
					<PostAuthor>
						By: <span style={{ fontWeight: 'bold' }}>{setPostAuthor()}</span>
					</PostAuthor>
					<PostLikes>
						{likeCount} {likeCount === 1 ? 'like' : 'likes'}
					</PostLikes>
				</PostInfo>
				<PostDescription>{post.description}</PostDescription>
			</PostContent>
			<PostActions>
				<IconTextButton
					text={isLiked ? 'Unlike' : 'Like'}
					icon={isLiked ? FaThumbsDown : FaRegThumbsUp}
					color={stylesConfig.colorPrimary}
					handleClick={handleClickLike}
				/>

				{/* the user can edit or delete only their own posts */}
				{isUserOwnPost() && (
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

const PostWrapper = styled.article`
	width: 100%;
	max-width: 35rem;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
	display: flex;
	flex-direction: column;
`;

const PostImage = styled.img`
	width: 100%;
	height: 25rem;
	object-fit: cover;
	/* object-position: 50% 80%; */
`;

const PostContent = styled.div`
	padding: 0 2rem;
	margin-top: 2rem;
	/* works like horizontal auto margin because it's a flex item */
	margin-bottom: auto;
`;

const PostInfo = styled.div`
	margin-bottom: 2rem;
`;

const PostTags = styled.p`
	font-size: 1.4rem;
	margin-bottom: 2rem;
	color: ${stylesConfig.colorGrey3};
`;

const PostTitle = styled.h3`
	font-size: 2.2rem;
	margin: 0.5rem 0;
`;

const PostAuthor = styled.p``;

const PostDate = styled.p``;

const PostLikes = styled.p``;

const PostDescription = styled.p`
	line-height: 1.5;
`;

const PostActions = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem 2rem 2rem;
	margin-top: 2rem;
`;
