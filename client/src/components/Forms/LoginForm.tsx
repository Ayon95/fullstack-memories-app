import React from 'react';
import { useState } from 'react';
import Button from '../Generic/Button';
import FormWrapper from './FormWrapper';
import Input from './Input';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { GoogleLoginFailedResponse } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logInGoogle } from '../../redux/slices/auth/authThunks';
import { RootState } from '../../redux/store';
import ErrorMessage from '../Generic/ErrorMessage';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationError, setValidationError] = useState('');
	const [googleLoginError, setGoogleLoginError] = useState('');
	const error = useSelector((state: RootState) => state.auth.error);

	const dispatch = useDispatch();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (![email, password].every(Boolean)) {
			return setValidationError('email or password is missing');
		}
		// dispatch action to log the user in
		dispatch(logIn({ email, password }));
	}

	function handleGoogleLoginSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
		// the response properties that I need to use only exist on the interface GoogleLoginResponse
		const successResponse = response as GoogleLoginResponse;
		// sending the token to the server for verifying it
		// it will also check whether or not it needs to create a new user in the database
		// a new user will be created if this user is logging in with Google for the first time
		dispatch(logInGoogle(successResponse.tokenId));
	}

	function handleGoogleLoginFailure(response: GoogleLoginFailedResponse) {
		setGoogleLoginError(response.error);
	}
	return (
		<FormWrapper title="Log In" handleSubmit={handleSubmit} style={{ width: '38rem' }}>
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

			{error && <ErrorMessage text={error} />}
			{validationError && <ErrorMessage text={validationError} />}
			{googleLoginError && <ErrorMessage text={googleLoginError} />}

			<Button
				text="Log In"
				color="primary"
				type="submit"
				style={{ width: '100%', marginBottom: '1rem' }}
			/>
			<GoogleLogin
				clientId="386122524309-7bg288ov7q2j6sfsjalmog0i4j55ea4o.apps.googleusercontent.com"
				render={renderProps => (
					<Button
						text="Google Login"
						color="primary"
						handleClick={renderProps.onClick}
						isDisabled={renderProps.disabled}
						style={{ width: '100%' }}
					/>
				)}
				onSuccess={handleGoogleLoginSuccess}
				onFailure={handleGoogleLoginFailure}
				cookiePolicy="single_host_origin"
			/>
		</FormWrapper>
	);
}

export default LoginForm;
