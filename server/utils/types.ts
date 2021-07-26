import mongoose from 'mongoose';

// extending the Request interface so that it may have the userId custom property
declare module 'express-serve-static-core' {
	export interface Request {
		user?: NativeUserDoc | GoogleUserDoc;
	}
}

// shape of a post without _id, _v, likes, and createdAt
// this is the expected request body for POST request
export type BasePost = {
	title: string;
	description: string;
	tags: string[];
	selectedFile: string;
};

// shape of Post doc -> it will contain some extra properties and default properties like _id and _v
export interface PostDoc extends mongoose.Document {
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
	comments: string[];
	likedBy: string[];
	createdAt: Date;
}

// shape of Comment Doc
export interface CommentDoc extends mongoose.Document {
	postId: string;
	author: string;
	comment: string;
	createdAt: Date;
}

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

// shape of Base User doc
export interface BaseUserDoc extends mongoose.Document {
	firstName: string;
	lastName: string;
	email: string;
	posts: string[];
	userType: 'NativeUser' | 'GoogleUser';
}

// shape of Native User doc
export interface NativeUserDoc extends BaseUserDoc {
	passwordHash: string;
}

// shape of Google User doc
export interface GoogleUserDoc extends BaseUserDoc {
	googleId: string;
}

// shape of search query object
export type SearchQuery = {
	searchTerm: string;
	tags: string;
};

// shape of getPost params object
export type GetPostParams = {
	id: string;
};
