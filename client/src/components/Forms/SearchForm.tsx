import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Button from '../Generic/Button';
import ChipInput from './ChipInput';
import FormWrapper from './FormWrapper';
import Input from './Input';

function SearchForm() {
	const [title, setTittle] = useState('');
	const [chips, setChips] = useState<string[]>([]);
	const status = useSelector((state: RootState) => state.posts.status);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
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

			<ChipInput name="tags" label="Tags" chips={chips} setChips={setChips} />

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
