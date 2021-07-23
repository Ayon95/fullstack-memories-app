import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/Forms/LoginForm';
import SignupForm from '../components/Forms/SignupForm';
import Button from '../components/Generic/Button';
import Modal from '../components/Modal/Modal';
import { RootState } from '../redux/store';
import stylesConfig from '../utils/stylesConfig';

function Welcome() {
	const [shouldShowModal, setShouldShowModal] = useState(false);
	const history = useHistory();
	const currentUser = useSelector((state: RootState) => state.auth.user);

	// redirect the logged-in user (if any) to the home page
	useEffect(() => {
		if (currentUser) history.push('/home');
	}, [currentUser, history]);

	function openModal() {
		setShouldShowModal(true);
	}

	function closeModal() {
		setShouldShowModal(false);
	}
	return (
		<>
			<PageContainer>
				<WelcomeContent>
					<BrandIntro>
						<h1>Memories</h1>
						<p>Share your unforgettable moments with the people you love</p>
						<Button text="Create Account" color="primary" handleClick={openModal} />
					</BrandIntro>
					<LoginForm />
				</WelcomeContent>
			</PageContainer>
			{shouldShowModal && (
				<Modal content={<SignupForm closeModal={closeModal} />} closeModal={closeModal} />
			)}
		</>
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
	justify-content: space-between;

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		flex-direction: column;
		align-items: center;
	}
`;
const BrandIntro = styled.div`
	h1 {
		font-size: 4rem;
		margin-bottom: 0.5rem;
	}

	p {
		max-width: 35ch;
		font-size: 2rem;
		color: ${stylesConfig.colorGrey3};
		margin-bottom: 4rem;

		@media only screen and (max-width: ${stylesConfig.bpMedium}) {
			margin-bottom: 2rem;
		}
	}

	@media only screen and (max-width: ${stylesConfig.bpMedium}) {
		margin-bottom: 6rem;
	}
`;
