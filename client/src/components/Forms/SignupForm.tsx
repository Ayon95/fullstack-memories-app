import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Button from '../generic/Button';
import FormWrapper from './FormWrapper';
import Input from './Input';

type Props = {
	closeModal: React.MouseEventHandler;
};

function SignupForm({ closeModal }: Props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<FormWrapper title="Sign Up" handleSubmit={handleSubmit} style={{ backgroundColor: '#eee' }}>
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
				style={{ width: '100%', marginBottom: '1rem' }}
			/>

			<Button
				text="Close"
				color="secondary"
				type="button"
				style={{ width: '100%' }}
				handleClick={closeModal}
			/>
		</FormWrapper>
	);
}

export default SignupForm;
