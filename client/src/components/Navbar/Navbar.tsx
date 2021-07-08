import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../style/stylesConfig';

function Navbar() {
	return (
		<NavbarContainer>
			<Title>Memories</Title>
		</NavbarContainer>
	);
}

export default Navbar;

const NavbarContainer = styled.header`
	background-color: #eee;
	box-shadow: ${stylesConfig.shadowNormal};
	border-radius: 4px;
	padding: 1rem 2rem;
	margin-bottom: 2rem;
`;

const Title = styled.h2``;

const NavButtons = styled.div``;
