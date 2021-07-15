import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasePost, ErrorObj, Post } from '../../../utils/types';

const baseUrl = 'http://localhost:5000/posts';

/* thunk creator that will be responsible for fetching all the posts from the backend
Specified a few generic arguments because I need to use thunkAPI in the payload creator:
- the first argument defines the return type of the payload creator
- the second argument defines the type of the payload creator's first argument; not passing any argument, so it is void
- the third argument is an object that defines types for thunkAPI properties;
here we are specifying the type of the value passed into rejectWithValue() */
export const fetchAllPosts = createAsyncThunk<Post[], string, { rejectValue: string }>(
	'posts/fetchAllPosts',
	async (token, thunkAPI) => {
		const response = await fetch(baseUrl, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
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
export const createPost = createAsyncThunk<
	Post,
	{ token: string; post: BasePost },
	{ rejectValue: string }
>('posts/createPost', async (requestData, thunkAPI) => {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${requestData.token}` },
		body: JSON.stringify(requestData.post),
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as Post;
	return data;
});

// thunk creator responsible for sending a PUT request to update an existing post
// need both the id and the edited post data for this request
export const updatePost = createAsyncThunk<
	Post,
	{ token: string; id: string; post: BasePost },
	{ rejectValue: string }
>('posts/updatePost', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${requestData.token}` },
		body: JSON.stringify(requestData.post),
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
	{ id: string; token: string },
	{ rejectValue: string }
>('posts/updateLikes', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}/likes`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': '0',
			Authorization: `Bearer ${requestData.token}`,
		},
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as Post;
	return data;
});

// thunk creator responsible for sending a DELETE request to delete a specific post
export const deletePost = createAsyncThunk<
	string,
	{ id: string; token: string },
	{ rejectValue: string }
>('posts/deletePost', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${requestData.token}` },
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	// return the id of the deleted post as payload because we will need it to remove that post from the postItems array
	return requestData.id;
});
