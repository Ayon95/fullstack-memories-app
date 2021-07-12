import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Forms/LoginForm';
import Button from '../components/generic/Button';
import stylesConfig from '../utils/stylesConfig';

function Welcome() {
	return (
		<PageContainer>
			<WelcomeContent>
				<BrandIntro>
					<h1>Memories</h1>
					<p>Share your unforgettable moments with the people you love</p>
					<Button text="Create Account" color="primary" isLink={true} />
				</BrandIntro>
				<LoginForm />
			</WelcomeContent>
		</PageContainer>
	);
}

export default Welcome;

const PageContainer = styled.div`
	height: 94vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const WelcomeContent = styled.main`
	width: 100%;
	max-width: 90rem;
	display: flex;
`;
const BrandIntro = styled.div`
	flex: 1.5;

	h1 {
		font-size: 4rem;
		margin-bottom: 0.5rem;
	}

	p {
		max-width: 35ch;
		font-size: 2rem;
		color: ${stylesConfig.colorGrey3};
		margin-bottom: 4rem;
	}
`;
