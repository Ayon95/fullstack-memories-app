import React from 'react';
import styled from 'styled-components';

type Props = {
	handleClick: React.MouseEventHandler;
};

function Backdrop({ handleClick }: Props) {
	return <Container onClick={handleClick} />;
}

export default Backdrop;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(43, 43, 43, 0.8);
	backdrop-filter: blur(3px);
`;
