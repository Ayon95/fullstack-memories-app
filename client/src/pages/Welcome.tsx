import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Forms/LoginForm';

function Welcome() {
	return (
		<WelcomeContainer>
			<BrandIntro>
				<h1>Memories</h1>
				<h2>Share your unforgettable moments with the people you love</h2>
			</BrandIntro>
			<LoginForm />
		</WelcomeContainer>
	);
}

export default Welcome;

const WelcomeContainer = styled.main`
	display: flex;
`;
const BrandIntro = styled.div`
	flex: 2;
`;
