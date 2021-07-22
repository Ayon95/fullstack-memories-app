import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginatedPostsResponse, Post, PostsSliceState } from '../../../utils/types';
import {
	isPaginatedFulfilledAction,
	isPendingAction,
	isRejectedAction,
	isUpdateFulfilledAction,
} from '../../matchers';
import { addComment, getPost } from './postsThunks';

const initialState: PostsSliceState = {
	postItems: [],
	detailedPost: null,
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
		builder.addCase(getPost.fulfilled, (state, action) => {
			state.status = 'success';
			state.detailedPost = action.payload;
		});

		// action.payload will be the post object containing the new comment
		builder.addCase(addComment.fulfilled, (state, action) => {
			state.status = 'success';
			// getting the updated posts list
			const updatedPostsList = state.postItems.map(post =>
				post._id === action.payload._id ? action.payload : post
			);
			// replacing the old posts list with the updated posts list
			state.postItems = updatedPostsList;
			// also updating the detailed post so that it contains the updated comments list
			state.detailedPost = action.payload;
		});

		builder.addMatcher(isPendingAction, state => {
			state.status = 'pending';
			state.error = '';
		});

		// this matcher matches all the fulfilled actions that result in a list of paginated posts (getPosts, getPostsBySearch, createPost, deletePost)
		builder.addMatcher(
			isPaginatedFulfilledAction,
			(state, action: PayloadAction<PaginatedPostsResponse>) => {
				state.status = 'success';
				state.postItems = action.payload.posts;
				state.totalNumPages = action.payload.totalNumPages;
			}
		);

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
