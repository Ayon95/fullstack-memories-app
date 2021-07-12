import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import stylesConfig from '../../utils/stylesConfig';
import { convertToBase64 } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../redux/slices/posts/postsSlice';
import { BasePost } from '../../utils/types';
import { RootState } from '../../redux/store';
import { createPost, updatePost } from '../../redux/slices/posts/postsThunks';
import { useEffect } from 'react';
import Button from '../generic/Button';
import FormWrapper from './FormWrapper';

function Form() {
	const [author, setAuthor] = useState('');
	const [title, setTittle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	// the image file will be converted to a base-64 string
	const [selectedFile, setSelectedFile] = useState('');

	const status = useSelector((state: RootState) => state.posts.status);
	const currentPostId = useSelector((state: RootState) => state.posts.currentPostId);
	const currentPost = useSelector((state: RootState) =>
		state.posts.postItems.find(post => post._id === currentPostId)
	);

	const dispatch = useDispatch();

	// populate form fields with the data of currently-selected post if there is a current post id
	useEffect(() => {
		function populateFormFields() {
			// I know for sure that when this function will be called, current post will exist
			setAuthor(currentPost!.author);
			setTittle(currentPost!.title);
			setDescription(currentPost!.description);
			setTags(currentPost!.tags);
			setSelectedFile(currentPost!.selectedFile);
		}
		if (currentPost) {
			populateFormFields();
		}
	}, [dispatch, currentPost]);

	// each time a user selects a file, the file will be converted to a base64-encoded string
	async function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const base64String = await convertToBase64(e.target.files[0]);
		setSelectedFile(base64String);
	}

	function resetForm() {
		setAuthor('');
		setTittle('');
		setDescription('');
		setTags([]);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const canSubmit = [author, title, description, tags, selectedFile].every(Boolean);
		if (!canSubmit) return console.log('A required field is missing');
		const post: BasePost = { author, title, description, tags, selectedFile };
		// need to update post if there is a current post id
		if (currentPostId) {
			dispatch(updatePost({ id: currentPostId, postData: post }));
			// clear current post id
			dispatch(postsActions.clearCurrentPostId());
		}
		// else create new post
		else dispatch(createPost(post));
		resetForm();
	}
	return (
		<FormWrapper
			title={currentPostId ? 'Edit' : 'Add' + ' A Memory'}
			handleSubmit={handleSubmit}
			style={{ alignSelf: 'flex-start' }}
		>
			<Input
				inputType="basic"
				type="text"
				name="author"
				label="Author"
				value={author}
				setValue={setAuthor}
			/>

			<Input
				inputType="basic"
				type="text"
				name="title"
				label="Title"
				value={title}
				setValue={setTittle}
			/>

			<Input
				inputType="textarea"
				name="description"
				label="Description"
				value={description}
				setValue={setDescription}
			/>

			<Input inputType="basic" name="tags" label="Tags" value={tags} setValue={setTags} />
			<input
				className="input--file"
				type="file"
				name="postImage"
				id="postImage"
				accept=".jpeg, .jpg, .png"
				onChange={handleChangeFile}
			/>

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

export default Form;

const FormComponent = styled.form`
	flex: 1;
	align-self: flex-start;
	padding: 2rem;
	border-radius: 4px;
	box-shadow: ${stylesConfig.shadowNormal};
`;

const FormTitle = styled.h3`
	text-align: center;
	font-size: 2.2rem;
	margin-bottom: 1rem;
`;
