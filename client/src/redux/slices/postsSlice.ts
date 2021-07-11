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

// thunk creator responsible for sending a PUT request to update the like count of a specific post
export const updateLikes = createAsyncThunk<
	Post,
	{ id: string; likes: number },
	{ rejectValue: string }
>('posts/updateLikes', async (post, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${post.id}/likes`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(post),
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as Post;
	return data;
});

// thunk creator responsible for sending a DELETE request to delete a specific post
export const deletePost = createAsyncThunk<string, string, { rejectValue: string }>(
	'posts/deletePost',
	async (id, thunkAPI) => {
		const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

		if (!response.ok) {
			const error = (await response.json()) as ErrorObj;
			return thunkAPI.rejectWithValue(error.errorMessage);
		}

		// return the id of the deleted post as payload because we will need it to remove that post from the postItems array
		return id;
	}
);

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

		// likePost: (state, action: PayloadAction<string>) => {
		// 	const updatedPostsList = state.postItems.map(post => {
		// 		if (post._id === action.payload) {
		// 			post.likes++;
		// 			return post;
		// 		}

		// 		return post;
		// 	});

		// 	state.postItems = updatedPostsList;
		// },

		// unlikePost: (state, action: PayloadAction<string>) => {
		// 	const updatedPostsList = state.postItems.map(post => {
		// 		if (post._id === action.payload) {
		// 			post.likes--;
		// 			return post;
		// 		}

		// 		return post;
		// 	});

		// 	state.postItems = updatedPostsList;
		// },
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

		builder.addCase(updateLikes.fulfilled, (state, action) => {
			state.status = 'success';
			// generating a new array where the old post is replaced with the updated post
			const updatedPostsList = state.postItems.map(post =>
				post._id === action.payload._id ? action.payload : post
			);

			state.postItems = updatedPostsList;
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
