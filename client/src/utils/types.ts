// shape of a post object
export type Post = {
	_id: string;
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
	likes: number;
	createdAt: Date;
};

// shape of posts state
export type PostsSliceState = {
	postItems: Post[];
	status: 'idle' | 'pending' | 'success' | 'failure';
	error: string;
};

// shape of error object sent as response by the server
export type ErrorObj = { errorMessage: string };
