import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
	inputType: 'basic' | 'textarea';
	type?: 'text' | 'email';
	name: string;
	label: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<any>>;
};

function Input(props: Props) {
	return (
		<FormControl>
			<Label htmlFor={props.name}>{props.label}</Label>
			{props.inputType === 'basic' && (
				<BasicInput
					type={props.type || 'text'}
					id={props.name}
					value={props.value}
					onChange={e => props.setValue(e.target.value)}
				/>
			)}
			{props.inputType === 'textarea' && (
				<TextArea
					id={props.name}
					value={props.value}
					onChange={e => props.setValue(e.target.value)}
				/>
			)}
		</FormControl>
	);
}

export default Input;

const FormControl = styled.div`
	margin-bottom: 2rem;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 4px;
`;

// generic input styles
const inputStyles = css`
	padding: 1rem;
	outline: none;
	border: none;
	background-color: #dfdfdf;
	border-radius: 4px;
	width: 100%;

	&:focus {
		box-shadow: 0 0 0 2px rgba(14, 2, 179, 0.3);
	}
`;

const BasicInput = styled.input`
	${inputStyles}
`;

const TextArea = styled.textarea`
	${inputStyles}
`;
