import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

// setting up the redux store
const store = configureStore({
	reducer: {
		posts: postsReducer,
	},
});

export default store;
