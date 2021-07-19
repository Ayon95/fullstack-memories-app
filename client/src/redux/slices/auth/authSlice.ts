import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../../../utils/helpers';
import { AuthSliceState, User } from '../../../utils/types';
import { isAuthFulfilledAction, isPendingAction, isRejectedAction } from '../../matchers';

const initialState: AuthSliceState = {
	user: getUserFromLocalStorage(),
	status: 'idle',
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},

		removeUser(state) {
			state.user = null;
		},
	},

	extraReducers: builder => {
		builder.addMatcher(isAuthFulfilledAction, (state, action: PayloadAction<User>) => {
			state.status = 'success';
			state.user = action.payload;
		});

		builder.addMatcher(isPendingAction, state => {
			state.status = 'pending';
			state.error = '';
		});

		builder.addMatcher(isRejectedAction, (state, action) => {
			state.status = 'failure';
			// action.payload will not be undefined if the promise was handled by rejectWithValue
			if (action.payload) state.error = action.payload;
			// if the rejected promise was not handled by rejectWithValue then the action will have an error object
			else state.error = action.error.message!;
		});
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
