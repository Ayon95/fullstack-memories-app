import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { getAuthorName } from '../../utils/helpers';
import stylesConfig from '../../utils/stylesConfig';
import { CommentObj, User } from '../../utils/types';

type Props = { commentData: CommentObj };

function Comment({ commentData }: Props) {
	const currentUser = useSelector((state: RootState) => state.auth.user) as User;
	return (
		<CommentItem>
			<Author>{getAuthorName(commentData, currentUser)}</Author>
			<CommentDate>{formatDistanceToNow(new Date(commentData.createdAt))} ago</CommentDate>
			<CommentBody>{commentData.comment}</CommentBody>
		</CommentItem>
	);
}

export default Comment;

const CommentItem = styled.li`
	:not(:last-child) {
		margin-bottom: 1rem;
	}
`;
const Author = styled.span`
	font-size: 1.4rem;
	font-weight: bold;
	margin-right: 0.5rem;
`;
const CommentDate = styled.span`
	color: ${stylesConfig.colorGrey4};
	font-size: 1.3rem;
`;
const CommentBody = styled.p`
	font-size: 1.5rem;
	margin-top: 0.2rem;
`;
