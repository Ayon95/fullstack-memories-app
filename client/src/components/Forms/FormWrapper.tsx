import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	title: string;
	children: React.ReactNode;
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	style?: React.CSSProperties;
};

function FormWrapper({ title, children, handleSubmit, style }: Props) {
	return (
		<FormComponent autoComplete="off" onSubmit={handleSubmit} style={style}>
			<FormTitle>{title}</FormTitle>
			{children}
		</FormComponent>
	);
}

export default FormWrapper;

const FormComponent = styled.form`
	padding: 2rem;
	border-radius: 4px;
	box-shadow: ${stylesConfig.shadowNormal};

	> :not(:last-child) {
		margin-bottom: 2rem;
	}
`;

const FormTitle = styled.h3`
	text-align: center;
	font-size: 2.2rem;
	/* margin-bottom: 2rem; */
`;
