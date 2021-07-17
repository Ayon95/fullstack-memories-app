import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPostsBySearch } from '../../redux/slices/posts/postsThunks';
import { RootState } from '../../redux/store';
import Button from '../Generic/Button';
import ChipInput from './ChipInput';
import FormWrapper from './FormWrapper';
import Input from './Input';

function SearchForm() {
	const [title, setTittle] = useState('');
	const [tags, setTags] = useState<string[]>([]);

	const status = useSelector((state: RootState) => state.posts.status);
	const dispatch = useDispatch();
	const history = useHistory();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// if neither a title nor tags are provided then simply return
		if (!title && tags.length === 0) return;

		// dispatch(getPostsBySearch({ searchTerm: title, tags }));
		// change the url so that it contains the specified query parameters
		// this is important because the user will be able to share this page containing the exact filter parameters
		history.push(`/home?searchTerm=${title || 'none'}&tags=${tags.join(',') || 'none'}`);
	}
	return (
		<FormWrapper title="Search" handleSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
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
		</FormWrapper>
	);
}

export default SearchForm;
