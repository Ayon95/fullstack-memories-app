import { Request, Response, NextFunction } from 'express';

function handleError(error: Error, request: Request, response: Response, next: NextFunction) {
	console.log(error.stack);
	// handling error that is thrown when a required field is missing
	if (error.name === 'RequiredFieldError') {
		return response.status(400).json({ errorMessage: error.message });
	}
	// handling error that is thrown when the requested post could not be found
	if (error.name === 'NonexistentResourceError') {
		return response.status(404).json({ errorMessage: error.message });
	}
	// handling CastError exceptions caused by invalid id for mongo documents
	if (error.name === 'CastError') {
		return response.status(400).json({ errorMessage: 'Invalid id provided' });
	}
	// handling ValidationError exception that is thrown when an object cannot be validated (when it fails to adhere to the defined schema)
	if (error.name === 'ValidationError') {
		// getting rid '(Model) validation failed: (field):' part
		const errorMessage = error.message.split(':')[2].trim();
		return response.status(400).json({ errorMessage });
	}
	// error that is thrown when a user tries to create an account with an email that is already in use
	if (error.name === 'DuplicateUserError') {
		return response.status(409).json({ errorMessage: error.message });
	}
	// AuthHeaderError that is thrown when the Authorization header is missing or it does not contain a Bearer token
	if (error.name === 'AuthHeaderError') {
		return response.status(400).json({ errorMessage: error.message });
	}
	// error that is thrown when incorrect password is provided
	if (error.name === 'PasswordError') {
		return response.status(401).json({ errorMessage: error.message });
	}
	// handling JsonWebTokenError exception that is thrown when a token cannot be verified
	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ errorMessage: 'Token is invalid' });
	}
	// handling TokenExpiredError exception that is thrown when a token is expired
	if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ errorMessage: 'Token is expired' });
	}
	// all other errors will be forwarded to Express' built-in error handler
	next(error);
}

export default handleError;
