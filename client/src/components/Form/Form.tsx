import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import stylesConfig from '../../utils/stylesConfig';
import { convertToBase64 } from '../../utils/helpers';

function Form() {
	const [author, setAuthor] = useState('');
	const [title, setTittle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState('');
	// the image file will be converted to a base-64 string
	const [selectedFile, setSelectedFile] = useState('');

	// each time a user selects a file, the file will be converted to a base64-encoded string
	async function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const base64String = await convertToBase64(e.target.files[0]);
		setSelectedFile(base64String);
	}
	return (
		<FormComponent autoComplete="off">
			<FormTitle>Add Memory</FormTitle>
			<FormControls>
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
			</FormControls>

			<FormButtonContainer>
				<FormButton className="btn btn--primary" type="submit">
					Submit
				</FormButton>
				<FormButton className="btn btn--secondary" type="button">
					Clear
				</FormButton>
			</FormButtonContainer>
		</FormComponent>
	);
}

export default Form;

const FormComponent = styled.form`
	padding: 1.5rem;
	border-radius: 4px;
	box-shadow: ${stylesConfig.shadowNormal};
	background-color: #eee;
`;

const FormTitle = styled.h3`
	text-align: center;
	font-size: 2.2rem;
	margin-bottom: 1rem;
`;

const FormControls = styled.div``;

const FormButtonContainer = styled.div``;

const FormButton = styled.button`
	width: 100%;
`;
