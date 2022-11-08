import { createAsyncThunk } from '@reduxjs/toolkit';
import { startLogoutTimer } from '../../../utils/helpers';
import { ErrorObj, User, UserRequestBody } from '../../../utils/types';
// old heroku deploy url - https://memories-app-mushfiq.herokuapp.com/user
const baseUrl = 'https://memories-app-910c.onrender.com/user';
export let logoutTimerId: number;

// this thunk will be responsible for sending a POST request to create a new user
export const signUp = createAsyncThunk<User, UserRequestBody, { rejectValue: string }>(
	'auth/signUp',
	async (userData, thunkAPI) => {
		const response = await fetch(`${baseUrl}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const error = (await response.json()) as ErrorObj;
			return thunkAPI.rejectWithValue(error.errorMessage);
		}

		// successful request
		const data = (await response.json()) as User;
		// saving user to local storage
		localStorage.setItem('memoriesUser', JSON.stringify(data));
		// starting the logout timer
		startLogoutTimer(logoutTimerId, thunkAPI.dispatch, data.token);
		return data;
	}
);

// this thunk will be responsible for sending a POST request to log the user in
export const logIn = createAsyncThunk<
	User,
	{ email: string; password: string },
	{ rejectValue: string }
>('auth/login', async (userCredentials, thunkAPI) => {
	const response = await fetch(`${baseUrl}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userCredentials),
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	// successful request
	const data = (await response.json()) as User;

	// saving user to local storage
	localStorage.setItem('memoriesUser', JSON.stringify(data));

	// starting the logout timer
	// this will log the user out when the token expires
	startLogoutTimer(logoutTimerId, thunkAPI.dispatch, data.token);

	return data;
});

// this thunk will be responsible for sending a POST request to log the user in with Google
export const logInGoogle = createAsyncThunk<User, string, { rejectValue: string }>(
	'auth/loginGoogle',
	async (token, thunkAPI) => {
		const response = await fetch(`${baseUrl}/login-google`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			const error = (await response.json()) as ErrorObj;
			return thunkAPI.rejectWithValue(error.errorMessage);
		}

		const data = (await response.json()) as User;

		// saving user to local storage
		localStorage.setItem('memoriesUser', JSON.stringify(data));

		// starting the logout timer
		startLogoutTimer(logoutTimerId, thunkAPI.dispatch, data.token);
		return data;
	}
);
