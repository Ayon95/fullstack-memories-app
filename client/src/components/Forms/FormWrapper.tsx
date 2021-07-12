import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	title: string;
	children: React.ReactNode;
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

function FormWrapper({ title, children, handleSubmit }: Props) {
	return (
		<FormComponent autoComplete="off" onSubmit={handleSubmit}>
			<FormTitle>{title}</FormTitle>
			{children}
		</FormComponent>
	);
}

export default FormWrapper;

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
