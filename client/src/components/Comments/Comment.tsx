import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

function Comment() {
	return (
		<CommentItem>
			<Author>Mushfiq Rahman</Author>
			<Date>2 days ago</Date>
			<CommentBody>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci repellat nam rerum debitis
				aliquam illo delectus in sed quis iusto!
			</CommentBody>
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
const Date = styled.span`
	color: ${stylesConfig.colorGrey4};
	font-size: 1.3rem;
`;
const CommentBody = styled.p`
	font-size: 1.5rem;
	margin-top: 0.2rem;
`;
