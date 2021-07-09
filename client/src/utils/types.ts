// shape of base post object
export type BasePost = {
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
};

export type Post = BasePost & {
	_id: string;
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
