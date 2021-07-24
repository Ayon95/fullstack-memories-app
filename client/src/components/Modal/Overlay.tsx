import React from 'react';
import styled from 'styled-components';

type Props = { children: React.ReactNode };

function Overlay({ children }: Props) {
	return <Container>{children}</Container>;
}

export default Overlay;

const Container = styled.div`
	padding: 1rem;
	width: 100%;
	max-width: 45rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
`;
