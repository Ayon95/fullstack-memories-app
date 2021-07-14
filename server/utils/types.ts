// extending the Request interface so that it may have the userId custom property
declare module 'express-serve-static-core' {
	export interface Request {
		userId?: string;
	}
}

// shape of a post without _id, _v, likes, and createdAt
// this is the expected request body for POST request
export type BasePost = {
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
};

// shape of Post doc
export type PostDoc = BasePost & {
	_id: string;
	likes: number;
	createdAt: string;
};

// shape of the user credentials object expected to be present in the POST request to log an existing user in
export type UserCredentials = {
	email: string;
	password: string;
};

// shape of the user object expected to be present in the POST request to create a new user
export type UserSignupRequest = UserCredentials & {
	firstName: string;
	lastName: string;
};

// shape of User doc
export type UserDoc = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: string;
};

// shape of the token payload
export type TokenPayload = {
	email: string;
	id: string;
};
