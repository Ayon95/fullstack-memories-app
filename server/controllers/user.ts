import { NextFunction, Request, Response } from 'express';
import NativeUser from '../models/User/NativeUser';
import { NativeUserDoc, UserCredentials, UserSignupRequest } from '../utils/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { TokenPayload } from 'google-auth-library';
import GoogleUser from '../models/User/GoogleUser';
import { googleOAuthClient } from '../index';
import {
	DuplicateUserError,
	NonexistentResourceError,
	PasswordError,
	RequiredFieldError,
} from '../utils/error';

export async function logIn(request: Request, response: Response, next: NextFunction) {
	const userCredentials: UserCredentials = request.body;
	// checking if both the email and password have been provided
	if (![userCredentials.email, userCredentials.password].every(Boolean)) {
		throw new RequiredFieldError();
	}

	try {
		// finding the corresponding user doc from the database
		const user = await NativeUser.findOne({ email: userCredentials.email });
		// checking whether such a user exists or not
		if (!user) {
			throw new NonexistentResourceError('No user exists with the given email');
		}
		// checking if the user provided the correct password
		const passwordIsCorrect = await bcrypt.compare(userCredentials.password, user.passwordHash);
		if (!passwordIsCorrect) {
			throw new PasswordError();
		}

		// generating a digitally-signed token containing the specified payload and signed with the secret string
		// the token payload contains necessary user information that the server can later use to verify the user who made the request
		// the token expires in 1 hours
		const payload = { email: user.email, id: user._id };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });

		response.json({
			token,
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			posts: user.posts,
		});
	} catch (error) {
		next(error);
	}
}

export async function signUp(request: Request, response: Response, next: NextFunction) {
	const userData: UserSignupRequest = request.body;

	try {
		// checking if a user already exists with the provided email
		const existingUser = await NativeUser.findOne({ email: userData.email });
		if (existingUser) {
			throw new DuplicateUserError();
		}
		// generating a password hash with the specified number of salt rounds
		const passwordHash = await bcrypt.hash(userData.password, 12);
		// creating a new user
		const newUser: NativeUserDoc = await NativeUser.create({
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
			posts: [],
			passwordHash,
		});
		// generating a signed token
		const payload = { email: newUser.email, id: newUser._id };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });

		response.status(201).json({
			token,
			userId: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			posts: newUser.posts,
		});
	} catch (error) {
		next(error);
	}
}

export async function logInGoogle(request: Request, response: Response, next: NextFunction) {
	try {
		const { token } = request.body;

		// verifying the ID token - the promise resolves to a login ticket object
		const loginTicket = await googleOAuthClient.verifyIdToken({
			idToken: token,
			audience: config.GOOGLE_OAUTH_CLIENT_ID,
		});

		// getting the token payload from the login ticket
		const { email, sub, given_name, family_name } = loginTicket.getPayload() as TokenPayload;

		// checking if the user already exists in the database, i.e. the user previously signed in with Google
		// note that this check needs to be performed using the 'sub' (unique ID for Google users)
		const existingUser = await GoogleUser.findOne({ googleId: sub });

		// if the user already exists, then don't create a new user in the database
		if (existingUser) {
			response.json({
				token,
				userId: existingUser._id,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
				posts: existingUser.posts,
			});
		}

		// the google user is signing in for the first time, so create a new user in the database
		if (!existingUser) {
			const newUser = await GoogleUser.create({
				googleId: sub,
				firstName: given_name,
				lastName: family_name,
				email,
				posts: [],
			});

			response.status(201).json({
				token,
				userId: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				posts: newUser.posts,
			});
		}
	} catch (error) {
		next(error);
	}
}
