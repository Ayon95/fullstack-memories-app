import React from 'react';
import { useState } from 'react';
import Button from '../generic/Button';
import FormWrapper from './FormWrapper';
import Input from './Input';

function SignupForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<FormWrapper title="Log In" handleSubmit={handleSubmit}>
			<Input
				inputType="basic"
				type="text"
				name="firstName"
				label="First Name"
				value={firstName}
				setValue={setFirstName}
			/>

			<Input
				inputType="basic"
				type="text"
				name="lasttName"
				label="Last Name"
				value={lastName}
				setValue={setLastName}
			/>

			<Input
				inputType="basic"
				type="email"
				name="email"
				label="Email"
				value={email}
				setValue={setEmail}
			/>

			<Input
				inputType="basic"
				type="password"
				name="password"
				label="Password"
				value={password}
				setValue={setPassword}
			/>

			<Input
				inputType="basic"
				type="password"
				name="confirmPassword"
				label="Confirm Password"
				value={confirmPassword}
				setValue={setConfirmPassword}
			/>

			<Button
				text="Sign Up"
				color="primary"
				type="submit"
				isDisabled={status === 'pending'}
				style={{ width: '100%' }}
			/>
		</FormWrapper>
	);
}

export default SignupForm;
