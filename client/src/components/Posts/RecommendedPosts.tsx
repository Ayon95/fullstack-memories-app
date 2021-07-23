import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFormattedDescription } from '../../utils/helpers';
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
						<LinkWrapper to={`/posts/${post._id}`} title="View Post Details">
							<h3>{post.title}</h3>
							<Author>
								Created By:{' '}
								<span>
									{post.author.firstName} {post.author.lastName}
								</span>
							</Author>
							<PostDescription>{getFormattedDescription(post.description)}</PostDescription>
							<PostImage src={`data:image/png;base64,${post.selectedFile}`} alt={post.title} />
						</LinkWrapper>
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
	display: grid;
	grid-template-columns: repeat(auto-fill, 25ch);
	gap: 2rem;
`;

const LinkWrapper = styled(Link)`
	text-decoration: none;
	color: ${stylesConfig.colorBlack};
`;

const RecommendedPost = styled.li``;

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
	height: 15rem;
	object-fit: cover;
	border-radius: 0.5rem;
`;
