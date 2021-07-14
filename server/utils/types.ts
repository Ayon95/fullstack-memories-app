import mongoose from 'mongoose';

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
	likedBy: string[];
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

// shape of User doc
export interface UserDoc extends mongoose.Document {
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: string;
	posts: string[];
}

// shape of the token payload
export type TokenPayload = {
	email: string;
	id: string;
};
