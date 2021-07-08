import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import stylesConfig from '../../utils/stylesConfig';

function Form() {
	const [title, setTittle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState('');
	return (
		<FormComponent>
			<FormTitle>Add Memory</FormTitle>
			<FormControls>
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
