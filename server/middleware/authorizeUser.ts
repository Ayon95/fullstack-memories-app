/* This middleware will be responsible for checking whether or not
a request to a protected resource contains the token needed to authorize the user.
Only an authorized user can access protected resources.
The server will expect the request to have an Authorization header containing the token.
The Authorization header's value is expected to be in the following format:
Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

Example:
- Suppose a user wants to create a post
- the user fills out a form and submits it
- the server needs to verify that the user has permission to perform that action
- this middleware will perform that check and will either authorize or deny the user
- the server will only process the request if the user is authorized

- submit form (send POST request) -> authorizeUser next() -> controller for creating new post
*/

import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import GoogleUser from '../models/User/GoogleUser';
import config from '../utils/config';
// import { TokenPayload } from '../utils/types';
import { googleOAuthClient } from './../index';
import NativeUser from './../models/User/NativeUser';

async function authorizeUser(request: Request, response: Response, next: NextFunction) {
	try {
		// getting the value of the Authorization header
		const authHeaderValue = request.get('Authorization');
		// checking if the header value exists and if it is using the Bearer scheme
		// if there is no Authorization header value, then that means there's no token
		if (!authHeaderValue || !authHeaderValue.toLowerCase().startsWith('bearer')) {
			return response.status(400).json({
				errorMessage: 'Authorization header is missing, or it does not have a Bearer token',
			});
		}
		// extract the token from the auth header value
		const token = authHeaderValue.split(' ')[1];
		// checking if the token is our own or one generated by Google Auth (token length > 500)
		const isCustomToken = token.length <= 500;

		let decodedPayload: jwt.JwtPayload;

		// verifying our server-generated token and getting its decoded payload
		if (isCustomToken) {
			// if the token is missing or is invalid, then a JsonWebTokenError will be thrown
			// if the token is expired, then a TokenExpiredError will be thrown
			decodedPayload = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;

			// finding the native user
			const nativeUser = await NativeUser.findById(decodedPayload.id);

			if (!nativeUser) {
				return response
					.status(401)
					.json({ errorMessage: 'The user needs to be logged-in to perform this action' });
			}

			// storing the user in the request object by creating a 'user' property on it
			request.user = nativeUser;
		}

		// if the token is from Google Auth
		if (!isCustomToken) {
			const loginTicket = await googleOAuthClient.verifyIdToken({
				idToken: token,
				audience: config.GOOGLE_OAUTH_CLIENT_ID,
			});

			const decodedPayload = loginTicket.getPayload() as TokenPayload;

			// finding the google user
			const googleUser = await GoogleUser.findOne({ googleId: decodedPayload.sub });

			if (!googleUser) {
				return response
					.status(401)
					.json({ errorMessage: 'The user needs to be logged-in to perform this action' });
			}

			request.user = googleUser;
		}

		// execute the next middleware
		next();
	} catch (error) {
		next(error);
	}
}

export default authorizeUser;
