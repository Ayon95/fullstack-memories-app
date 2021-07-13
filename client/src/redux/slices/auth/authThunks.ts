import { User } from '../../../utils/types';
import { AppDispatch } from '../../store';
import { authActions } from './authSlice';

// this thunk will be responsible for saving user to local storage and setting user in redux store
export function saveUser(user: User) {
	return function (dispatch: AppDispatch) {
		// saving user to local storage
		localStorage.setItem('memoriesUser', JSON.stringify(user));
		// dispatching action to set user in redux store
		dispatch(authActions.setUser(user));
	};
}

// this thunk will be responsible for getting user (if any) from local storage, and setting that user in redux store
export function getUser() {
	return function (dispatch: AppDispatch) {
		// getting user from local storage
		const user = localStorage.getItem('memoriesUser');
		if (!user) return;
		// dispatching action to set user in redux store if user exists
		dispatch(authActions.setUser(JSON.parse(user)));
	};
}

// this thunk will be responsible for logging the user out (remove user from local storage and redux store)
export function logOut() {
	return function (dispatch: AppDispatch) {
		// remove user from local storage
		localStorage.removeItem('memoriesUser');
		// remove user from redux store
		dispatch(authActions.removeUser());
	};
}
