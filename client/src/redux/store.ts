import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/posts/postsSlice';
import authReducer from './slices/auth/authSlice';

// setting up the redux store
const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
	},
});

// getting the type of the root state object
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
