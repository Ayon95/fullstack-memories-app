import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';
import { Post } from '../../utils/types';

type Props = {
	posts: Post[];
};

function RecommendedPosts({ posts }: Props) {
	return (
		<RecommendedPostsContainer>
			<h2>You might also like</h2>
			<RecommendedPostsList>
				{posts.map(post => (
					<RecommendedPost key={post._id}>
						<h3>{post.title}</h3>
						<Author>
							Created By:{' '}
							<span>
								{post.author.firstName} {post.author.lastName}
							</span>
						</Author>
						<PostDescription>{post.description.substring(0, 100)}....</PostDescription>
						<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
					</RecommendedPost>
				))}
			</RecommendedPostsList>
		</RecommendedPostsContainer>
	);
}

export default RecommendedPosts;

const RecommendedPostsContainer = styled.div`
	h2 {
		padding-bottom: 0.5rem;
		margin-bottom: 2rem;
		border-bottom: 1px solid ${stylesConfig.colorGrey1};
	}
`;

const RecommendedPostsList = styled.ul`
	list-style: none;
	display: flex;
`;

const RecommendedPost = styled.li`
	max-width: 25ch;

	:not(:last-child) {
		margin-right: 2rem;
	}
`;

const Author = styled.p`
	span {
		font-weight: bold;
	}
`;

const PostDescription = styled.p`
	font-size: 1.5rem;
	margin: 1rem 0;
`;

const PostImage = styled.img`
	width: 100%;
	border-radius: 0.5rem;
`;
