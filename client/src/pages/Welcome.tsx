import React from 'react';
import styled from 'styled-components';

function Welcome() {
	return (
		<WelcomeContainer>
			<BrandIntro>
				<h1>Memories</h1>
				<h2>Share your unforgettable moments with the people you love</h2>
			</BrandIntro>
		</WelcomeContainer>
	);
}

export default Welcome;

const WelcomeContainer = styled.main``;
const BrandIntro = styled.div``;
