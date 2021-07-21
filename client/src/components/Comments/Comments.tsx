import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Forms/Input';
import Button from '../Generic/Button';
import Comment from './Comment';

function Comments() {
	const [comment, setComment] = useState('');
	return (
		<CommentsContainer>
			<CommentsList>
				<h3>Comments</h3>
				<Comment />
				<Comment />
			</CommentsList>
			<CommentForm>
				<Input
					inputType="textarea"
					name="comment"
					label="Write A Comment"
					value={comment}
					setValue={setComment}
				/>

				<Button text="Comment" color="primary" style={{ marginTop: '1rem' }} />
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
