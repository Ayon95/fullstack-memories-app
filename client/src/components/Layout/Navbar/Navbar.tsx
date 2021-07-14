import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { authActions } from '../../../redux/slices/auth/authSlice';
import { RootState } from '../../../redux/store';
import stylesConfig from '../../../utils/stylesConfig';
import Button from '../../Generic/Button';

function Navbar() {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentUser = useSelector((state: RootState) => state.auth.user);

	function handleClickLogout() {
		// remove user from local storage
		localStorage.removeItem('memoriesUser');
		// remove user from redux store
		dispatch(authActions.removeUser());
		// redirect user to Welcome page
		history.push('/');
	}
	return (
		<NavbarContainer>
			<Title>Hello, {currentUser?.firstName}</Title>
			<NavLinks>
				<Button text="Log Out" color="secondary" handleClick={handleClickLogout} />
			</NavLinks>
		</NavbarContainer>
	);
}

export default Navbar;

const NavbarContainer = styled.header`
	box-shadow: ${stylesConfig.shadowNormal};
	border-radius: 4px;
	padding: 1.5rem 2rem;
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h2``;

const NavLinks = styled.nav``;
