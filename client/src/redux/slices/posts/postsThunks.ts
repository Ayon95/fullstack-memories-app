import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasePost, ErrorObj, PaginatedPostsResponse, Post } from '../../../utils/types';

const baseUrl = 'http://localhost:5000/posts';

/* thunk creator that will be responsible for fetching all the posts from the backend
Specified a few generic arguments because I need to use thunkAPI in the payload creator:
- the first argument defines the return type of the payload creator
- the second argument defines the type of the payload creator's first argument; not passing any argument, so it is void
- the third argument is an object that defines types for thunkAPI properties;
here we are specifying the type of the value passed into rejectWithValue() */
export const getPosts = createAsyncThunk<
	PaginatedPostsResponse,
	{ token: string; page: string },
	{ rejectValue: string }
>('posts/getPosts', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}?page=${requestData.page}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${requestData.token}` },
	});
	// handling unsuccessful requests
	// the server will respond with an error object
	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}
	// the request was successful
	// using type assertion to tell TS that the response data will be an array of Post objects
	const data = (await response.json()) as PaginatedPostsResponse;
	return data;
});

// thunk creator responsible for sending a GET request to get a specific post
export const getPost = createAsyncThunk<
	Post,
	{ token: string; id: string },
	{ rejectValue: string }
>('posts/getPost', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}`);

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as Post;
	return data;
});

// thunk creator responsible for sending a GET request to get posts based on the search query
export const getPostsBySearch = createAsyncThunk<
	PaginatedPostsResponse,
	{ token: string; page: string; searchTerm: string; tags: string },
	{ rejectValue: string }
>('posts/getPostsBySearch', async (requestData, thunkAPI) => {
	// specifying two query parameters -> searchTerm and tags
	const response = await fetch(
		// the url will look something like -> http://localhost:5000/posts/search?page=1&searchTerm=niagara&tags=niagara,canada,usa
		`${baseUrl}/search?page=${requestData.page}&searchTerm=${
			requestData.searchTerm || 'none'
		}&tags=${requestData.tags || 'none'}`,
		{
			method: 'GET',
			headers: { Authorization: `Bearer ${requestData.token}` },
		}
	);

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as PaginatedPostsResponse;
	return data;
});

// thunk creator responsible for sending a POST request to add a new post
export const createPost = createAsyncThunk<
	PaginatedPostsResponse,
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

	// expecting to get a list of paginated posts and totalNumPages
	const data = (await response.json()) as PaginatedPostsResponse;
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

// thunk creator responsible for sending a POSt request to add a comment to a post
export const addComment = createAsyncThunk<
	Post,
	{ id: string; token: string; comment: string },
	{ rejectValue: string }
>('posts/addComment', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}/comment`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestData.token}`,
		},
		body: JSON.stringify({ comment: requestData.comment }),
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
	PaginatedPostsResponse,
	{ id: string; token: string; page: string },
	{ rejectValue: string }
>('posts/deletePost', async (requestData, thunkAPI) => {
	const response = await fetch(`${baseUrl}/${requestData.id}?page=${requestData.page}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${requestData.token}` },
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorObj;
		return thunkAPI.rejectWithValue(error.errorMessage);
	}

	const data = (await response.json()) as PaginatedPostsResponse;
	return data;
});
