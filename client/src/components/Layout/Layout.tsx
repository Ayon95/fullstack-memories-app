import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
	return (
		<LayoutContainer>
			<Navbar />
			{children}
		</LayoutContainer>
	);
}

export default Layout;

const LayoutContainer = styled.div`
	width: 100%;
	max-width: 150rem;
	margin: 0 auto;
`;
