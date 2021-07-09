import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrorObj, Post, PostsSliceState } from '../../utils/types';

const baseUrl = 'http://localhost:5000/posts';

const initialState: PostsSliceState = {
	postItems: [],
	status: 'idle',
	error: '',
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

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchAllPosts.pending, state => {
			state.status = 'pending';
			state.error = '';
		});

		builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
			state.status = 'success';
			state.postItems = action.payload;
		});

		builder.addCase(fetchAllPosts.rejected, (state, action) => {
			state.status = 'failure';
			// action.payload will not be undefined if the promise was handled by rejectWithValue
			if (action.payload) state.error = action.payload;
			// if the rejected promise was not handled by rejectWithValue then the action will have an error object
			else state.error = action.error.message!;
		});
	},
});

export default postsSlice.reducer;
