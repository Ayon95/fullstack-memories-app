import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

// setting up the redux store
const store = configureStore({
	reducer: {
		posts: postsReducer,
	},
});

// getting the type of the root state object
export type RootState = ReturnType<typeof store.getState>;

export default store;
