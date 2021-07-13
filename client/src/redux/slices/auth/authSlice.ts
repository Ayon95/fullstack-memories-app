import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState, User } from '../../../utils/types';

const initialState: AuthSliceState = {
	user: null,
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
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
