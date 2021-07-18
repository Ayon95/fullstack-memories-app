import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, getPostsBySearch } from '../../redux/slices/posts/postsThunks';
import { RootState } from '../../redux/store';
import stylesConfig from '../../utils/stylesConfig';
import Button from '../Generic/Button';
import ChipInput from './ChipInput';
import FormWrapper from './FormWrapper';
import Input from './Input';

function SearchForm() {
	const [title, setTittle] = useState('');
	const [tags, setTags] = useState<string[]>([]);

	const status = useSelector((state: RootState) => state.posts.status);
	const token = useSelector((state: RootState) => state.auth.user!.token);
	const posts = useSelector((state: RootState) => state.posts.postItems);
	const currentPage = useSelector((state: RootState) => state.posts.currentPage);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// if neither a title nor tags are provided then simply return
		if (!title && tags.length === 0) return;
		dispatch(
			getPostsBySearch({
				token,
				page: currentPage.toString(),
				searchTerm: title,
				tags: tags.join(','),
			})
		);
		history.push('/home/search');
	}

	// this function will grab the unfiltered posts (not filtered by search criteria)
	function handleClickReset() {
		setTittle('');
		setTags([]);
		dispatch(getPosts({ token, page: '1' }));
		history.push('/home');
	}
	return (
		<FormWrapper title="Search" handleSubmit={handleSubmit}>
			<Input
				inputType="basic"
				type="text"
				name="title"
				label="Title"
				value={title}
				setValue={setTittle}
			/>

			<ChipInput name="tags" label="Tags" chips={tags} setChips={setTags} />

			<Button
				text="Submit"
				color="primary"
				type="submit"
				isDisabled={status === 'pending'}
				style={{ width: '100%' }}
			/>
			{location.pathname.includes('search') && (
				<Button
					text="Reset"
					color="secondary"
					isDisabled={status === 'pending'}
					style={{ width: '100%', marginTop: '1rem' }}
					handleClick={handleClickReset}
				/>
			)}
			{location.pathname.includes('search') && (
				<SearchResultsText>Found {posts.length || 'No'} results</SearchResultsText>
			)}
		</FormWrapper>
	);
}

export default SearchForm;

const SearchResultsText = styled.p`
	margin-top: 1rem;
	font-style: italic;
	color: ${stylesConfig.colorGrey3};
`;
