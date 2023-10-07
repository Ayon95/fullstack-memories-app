import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addComment } from '../../redux/slices/posts/postsThunks';
import { RootState } from '../../redux/store';
import { getCommentsHeading } from '../../utils/helpers';
import { Post } from '../../utils/types';
import Input from '../Forms/Input';
import Button from '../Generic/Button';
import Comment from './Comment';

function Comments() {
	const [comment, setComment] = useState('');
	const post = useSelector((state: RootState) => state.posts.detailedPost) as Post;
	const token = useSelector((state: RootState) => state.auth.user!.token);
	const dispatch = useDispatch();

	function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!comment) return;
		dispatch(addComment({ id: post._id, token, comment }));
		setComment('');
	}
	return (
		<CommentsContainer>
			<CommentsList>
				<h3>{getCommentsHeading(post.comments.length)}</h3>
				{post.comments.map(comment => (
					<Comment key={comment._id} commentData={comment} />
				))}
			</CommentsList>
			<CommentForm onSubmit={handleSubmitComment}>
				<Input
					inputType="textarea"
					name="comment"
					label="Write A Comment"
					value={comment}
					setValue={setComment}
				/>

				<Button text="Comment" type="submit" color="primary" style={{ marginTop: '1rem' }} />
			</CommentForm>
		</CommentsContainer>
	);
}

export default Comments;

const CommentsContainer = styled.div`
	margin-bottom: 2rem;
`;

const CommentsList = styled.ul`
	margin-bottom: 2rem;
	h3 {
		font-size: 2.2rem;
		margin-bottom: 1rem;
	}
	list-style: none;
`;

const CommentForm = styled.form``;
