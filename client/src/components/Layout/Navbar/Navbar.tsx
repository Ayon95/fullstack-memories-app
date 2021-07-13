import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logOut } from '../../../redux/slices/auth/authThunks';
import stylesConfig from '../../../utils/stylesConfig';
import Button from '../../Generic/Button';

function Navbar() {
	const dispatch = useDispatch();
	const history = useHistory();

	function handleClickLogout() {
		// dispatch action to log the user out
		dispatch(logOut());
		// redirect user to Welcome page
		history.push('/');
	}
	return (
		<NavbarContainer>
			<Title>Memories</Title>
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
