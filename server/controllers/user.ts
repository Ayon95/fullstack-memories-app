import { Request, Response } from 'express';
import NativeUser from '../models/User/NativeUser';
import { UserCredentials, UserDoc, UserSignupRequest } from '../utils/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

export async function logIn(request: Request, response: Response) {
	const userCredentials: UserCredentials = request.body;
	// checking if both the email and password have been provided
	if (![userCredentials.email, userCredentials.password].every(Boolean)) {
		return response.status(400).json({ errorMessage: 'Email or password is missing' });
	}

	try {
		// finding the corresponding user doc from the database
		const user = await NativeUser.findOne({ email: userCredentials.email });
		// checking whether such a user exists or not
		if (!user) {
			return response.status(404).json({ errorMessage: 'No user with this email exists' });
		}
		// checking if the user provided the correct password
		const passwordIsCorrect = await bcrypt.compare(userCredentials.password, user.passwordHash);
		if (!passwordIsCorrect) {
			return response.status(401).json({ errorMessage: 'Incorrect password provided' });
		}

		// generating a digitally-signed token containing the specified payload and signed with the secret string
		// the token payload contains necessary user information that the server can later use to verify the user who made the request
		// the token expires in 1 hours
		const payload = { email: user.email, id: user._id };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });

		response.status(200).json({
			token,
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			posts: user.posts,
		});
	} catch {
		response.status(500).json({ errorMessage: 'Internal server error' });
	}
}

export async function signUp(request: Request, response: Response) {
	const userData: UserSignupRequest = request.body;

	try {
		// checking if a user already exists with the provided email
		const existingUser = await NativeUser.findOne({ email: userData.email });
		if (existingUser) {
			return response.status(400).json({ errorMessage: 'A user with this email already exists' });
		}
		// generating a password hash with the specified number of salt rounds
		const passwordHash = await bcrypt.hash(userData.password, 12);
		// creating a new user
		const newUser: UserDoc = await NativeUser.create({
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
			passwordHash,
		});
		// generating a signed token
		const payload = { email: newUser.email, id: newUser._id };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });

		response.status(200).json({
			token,
			userId: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			posts: newUser.posts,
		});
	} catch {
		response.status(500).json({ errorMessage: 'Internal server error' });
	}
}
