// shape of user object
export type User = {
	userId: string;
	token: string;
	firstName: string;
	lastName: string;
};

// shape of auth state
export type AuthSliceState = {
	user: User;
	status: 'idle' | 'pending' | 'success' | 'failure';
	error: string;
};

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
	createdAt: Date;
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

// shape of the error object sent by Google in case of failed login
export type GoogleLoginFailedResponse = {
	error: string;
	idpId: string;
	type: string;
};
