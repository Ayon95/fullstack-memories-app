import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { IconButtonProps, Post } from '../../utils/types';
import { FaThumbsUp, FaTrashAlt, FaEdit } from 'react-icons/fa';
import stylesConfig from '../../utils/stylesConfig';
import { useDispatch } from 'react-redux';
import { postsActionCreators } from '../../redux/slices/postsSlice';

type Props = { post: Post };

function PostItem({ post }: Props) {
	const dispatch = useDispatch();

	function handleClickEdit(id: string) {
		dispatch(postsActionCreators.setCurrentPostId(id));
	}
	return (
		<PostWrapper>
			<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
			<PostContent>
				<PostInfo>
					<PostTags>{post.tags}</PostTags>
					<PostDate>{formatDistanceToNow(new Date(post.createdAt))} ago</PostDate>
					<PostTitle>{post.title}</PostTitle>
					<PostLikes>{post.likes} likes</PostLikes>
				</PostInfo>
				<PostDescription>{post.description}</PostDescription>
			</PostContent>
			<PostActions>
				<IconButton color={stylesConfig.colorPrimary}>
					<FaThumbsUp />
					Like
				</IconButton>

				<IconButton color={stylesConfig.colorGrey3} onClick={() => handleClickEdit(post._id)}>
					<FaEdit />
					Edit
				</IconButton>

				<IconButton color={stylesConfig.colorSecondary}>
					<FaTrashAlt />
					Delete
				</IconButton>
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
	/* this works like horizontal auto margin because its a flex item */
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
`;

const IconButton = styled.button<IconButtonProps>`
	font-size: 1.6rem;
	color: ${props => props.color};
	font-family: 'Roboto';
	text-transform: uppercase;
	background: transparent;
	border: none;
	display: flex;
	cursor: pointer;
	position: relative;
	padding: 0.5rem;

	&:hover::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-color: currentColor;
		opacity: 0.1;
	}

	svg {
		fill: currentColor;
		margin-right: 0.5rem;
	}
`;
