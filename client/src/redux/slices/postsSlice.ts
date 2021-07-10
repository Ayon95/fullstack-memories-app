import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasePost, ErrorObj, Post, PostsSliceState } from '../../utils/types';
import { isPendingAction, isRejectedAction } from './../matchers';

const baseUrl = 'http://localhost:5000/posts';

const initialState: PostsSliceState = {
	postItems: [],
	status: 'idle',
	error: '',
	currentPostId: '',
};

/* thunk creator that will be responsible for fetching all the posts from the backend
Specified a few generic arguments because I need to use thunkAPI in the payload creator:
- the first argument defines the return type of the payload creator
- the second argument defines the type of the payload creator's first argument; not passing any argument, so it is void
- the third argument is an object that defines types for thunkAPI properties;
here we are specifying the type of the value passed into rejectWithValue() */
export const fetchAllPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
	'posts/fetchAllPosts',
	async (_, thunkAPI) => {
		const response = await fetch(baseUrl);
		// handling unsuccessful requests
		// the server will respond with an error object
		if (!response.ok) {
			const error = (await response.json()) as ErrorObj;
			return thunkAPI.rejectWithValue(error.errorMessage);
		}
		// the request was successful
		// using type assertion to tell TS that the response data will be an array of Post objects
		const data = (await response.json()) as Post[];
		return data;
	}
);

// thunk creator responsible for sending a POST request to add a new post
export const createPost = createAsyncThunk<Post, BasePost, { rejectValue: string }>(
	'posts/createPost',
	async (post, thunkAPI) => {
		const response = await fetch(baseUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(post),
		});

		if (!response.ok) {
			const error = (await response.json()) as ErrorObj;
			return thunkAPI.rejectWithValue(error.errorMessage);
		}

		const data = (await response.json()) as Post;
		return data;
	}
);

// thunk creator responsible for sending a PUT request to update an existing post
// need both the id and the edited post data for this request
export const updatePost = createAsyncThunk<
	Post,
	{ id: string; postData: BasePost },
	{ rejectValue: string }
>('posts/updatePost', async (post, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${post.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(post.postData),
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as Post;
	return data;
});

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
	},
	extraReducers: builder => {
		builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems = action.payload;
		});

		builder.addCase(createPost.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems.push(action.payload);
		});

		builder.addCase(updatePost.fulfilled, (state, action) => {
			state.status = 'success';
			// generating a new array where the old post is replaced with the updated post
			const updatedPostsList = state.postItems.map(post =>
				post._id === action.payload._id ? action.payload : post
			);

			state.postItems = updatedPostsList;
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

export const postsActionCreators = postsSlice.actions;

export default postsSlice.reducer;
