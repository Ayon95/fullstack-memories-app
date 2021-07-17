import React from 'react';
import styled from 'styled-components';

type Props = { text: string };

function ErrorMessage({ text }: Props) {
	return <Text>{text}</Text>;
}

export default ErrorMessage;

const Text = styled.p`
	color: #cf0c2d;
	margin-top: 0.5rem;
`;
