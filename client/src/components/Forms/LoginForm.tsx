import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import Button from '../generic/Button';
import FormWrapper from './FormWrapper';
import Input from './Input';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const status = useSelector((state: RootState) => state.posts.status);
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}
	return (
		<FormWrapper title="Log In" handleSubmit={handleSubmit}>
			<Input
				inputType="basic"
				type="text"
				name="email"
				label="Email"
				value={email}
				setValue={setEmail}
			/>

			<Input
				inputType="basic"
				type="text"
				name="password"
				label="Password"
				value={password}
				setValue={setPassword}
			/>

			<Button
				text="Log In"
				color="primary"
				type="submit"
				isDisabled={status === 'pending'}
				style={{ width: '100%', marginBottom: '2rem' }}
			/>

			<SignupText>
				Don't have an account ? <Link to="/signup">Sign up</Link>
			</SignupText>
		</FormWrapper>
	);
}

export default LoginForm;

const SignupText = styled.p``;