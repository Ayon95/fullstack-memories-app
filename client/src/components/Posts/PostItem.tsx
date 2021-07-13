import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { Post } from '../../utils/types';
import { FaThumbsUp, FaTrashAlt, FaEdit, FaThumbsDown } from 'react-icons/fa';
import stylesConfig from '../../utils/stylesConfig';
import { useDispatch } from 'react-redux';
import { postsActions } from '../../redux/slices/posts/postsSlice';
import { useState } from 'react';
import { deletePost, updateLikes } from './../../redux/slices/posts/postsThunks';
import IconTextButton from '../Generic/IconTextButton';

type Props = { post: Post };

function PostItem({ post }: Props) {
	const [isLiked, setIsLiked] = useState(false);
	const dispatch = useDispatch();

	function handleClickEdit(id: string) {
		dispatch(postsActions.setCurrentPostId(id));
	}

	function handleClickDelete(id: string) {
		dispatch(deletePost(id));
	}

	function handleClickLike(id: string) {
		// if the post is already liked, then unlike the post
		// if the post is not liked, then like the post
		if (isLiked) dispatch(updateLikes({ id, likes: post.likes - 1 }));
		if (!isLiked) dispatch(updateLikes({ id, likes: post.likes + 1 }));

		setIsLiked(prevState => !prevState);
	}
	return (
		<PostWrapper>
			<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
			<PostContent>
				<PostInfo>
					<PostTags>{post.tags}</PostTags>
					<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
					<PostTitle>{post.title}</PostTitle>
					<PostLikes>
						{post.likes} {post.likes === 1 ? 'like' : 'likes'}
					</PostLikes>
				</PostInfo>
				<PostDescription>{post.description}</PostDescription>
			</PostContent>
			<PostActions>
				<IconTextButton
					text={isLiked ? 'Unlike' : 'Like'}
					icon={isLiked ? FaThumbsDown : FaThumbsUp}
					color={stylesConfig.colorPrimary}
					handleClick={() => handleClickLike(post._id)}
				/>

				<IconTextButton
					text="Edit"
					icon={FaEdit}
					color={stylesConfig.colorGrey3}
					handleClick={() => handleClickEdit(post._id)}
				/>

				<IconTextButton
					text="Delete"
					icon={FaTrashAlt}
					color={stylesConfig.colorSecondary}
					handleClick={() => handleClickDelete(post._id)}
				/>
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

const PostDate = styled.p``;

const PostLikes = styled.p``;

const PostDescription = styled.p``;

const PostActions = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem 2rem 2rem;
	margin-top: 2rem;
`;
