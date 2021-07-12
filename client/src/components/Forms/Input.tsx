import React from 'react';
import styled, { css } from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	inputType: 'basic' | 'textarea';
	type?: 'text' | 'email' | 'password';
	name: string;
	label: string;
	value: string | string[];
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
					maxLength={250}
					onChange={e => props.setValue(e.target.value)}
					rows={6}
					placeholder="Maximum 250 characters"
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
	width: 100%;
	padding: 1rem;
	outline: none;
	border: none;
	background-color: ${stylesConfig.colorGrey1};
	border-radius: 4px;

	&:focus {
		box-shadow: ${stylesConfig.inputFocusStyle};
	}
`;

const BasicInput = styled.input`
	${inputStyles}
`;

const TextArea = styled.textarea`
	${inputStyles}
`;
