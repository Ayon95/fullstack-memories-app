// shape of base post object
export type BasePost = {
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
};

// the final post object after being saved to the database
export type Post = BasePost & {
	_id: string;
	likes: number;
	// a Date object gets parsed to a string after parsing the JSON data sent by the server
	// parse it back to a date object yourself wherever you are using it, e.g. in the PostItem component
	createdAt: string;
};

// shape of posts state
export type PostsSliceState = {
	postItems: Post[];
	status: 'idle' | 'pending' | 'success' | 'failure';
	error: string;
	currentPostId: string;
};

// shape of error object sent as response by the server
export type ErrorObj = { errorMessage: string };

// shape of props object for IconButton
export type IconButtonProps = { readonly color: string };
