import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsSliceState } from '../../../utils/types';
import { isPendingAction, isRejectedAction, isUpdateFulfilledAction } from '../../matchers';
import { createPost, deletePost, getPosts, getPostsBySearch } from './postsThunks';

const initialState: PostsSliceState = {
	postItems: [],
	status: 'idle',
	error: '',
	currentPostId: '',
	currentPage: 1,
	totalNumPages: 1,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setCurrentPostId: (state, action: PayloadAction<string>) => {
			state.currentPostId = action.payload;
		},

		clearCurrentPostId: state => {
			state.currentPostId = '';
		},

		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(getPosts.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems = action.payload.posts;
			state.totalNumPages = action.payload.totalNumPages;
		});

		builder.addCase(getPostsBySearch.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems = action.payload.posts;
			state.totalNumPages = action.payload.totalNumPages;
		});

		builder.addCase(createPost.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems.push(action.payload);
		});

		builder.addCase(deletePost.fulfilled, (state, action) => {
			state.status = 'success';
			const updatedPostsList = state.postItems.filter(post => post._id !== action.payload);
			state.postItems = updatedPostsList;
		});

		builder.addMatcher(isPendingAction, state => {
			state.status = 'pending';
			state.error = '';
		});

		// this matcher handles update fulfilled cases (both for actual post and post likes)
		builder.addMatcher(isUpdateFulfilledAction, (state, action: PayloadAction<Post>) => {
			state.status = 'success';
			// generating a new array where the old post is replaced with the updated post
			const updatedPostsList = state.postItems.map(post =>
				post._id === action.payload._id ? action.payload : post
			);

			state.postItems = updatedPostsList;
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

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
