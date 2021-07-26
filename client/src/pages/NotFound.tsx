import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Generic/Button';

function NotFound() {
	const history = useHistory();
	return (
		<PageContainer>
			<Content>
				<h1>404</h1>
				<p>The page you were looking for does not exist</p>
				<Button text="Go Back" color="primary" handleClick={() => history.goBack()} />
			</Content>
		</PageContainer>
	);
}

export default NotFound;

const PageContainer = styled.div`
	height: 94vh;
	display: grid;
	place-content: center;
`;
const Content = styled.main`
	text-align: center;
	h1 {
		font-size: 7rem;
		line-height: 1;
	}

	p {
		font-size: 2.2rem;
		margin-bottom: 3rem;
	}
`;
