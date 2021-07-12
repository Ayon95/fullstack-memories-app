import React from 'react';
import styled from 'styled-components';

type Props = { children: React.ReactNode };

function Overlay({ children }: Props) {
	return <Container>{children}</Container>;
}

export default Overlay;

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
`;
