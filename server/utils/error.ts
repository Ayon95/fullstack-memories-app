// error object for when the user does not provide a required field
export class RequiredFieldError extends Error {
	constructor() {
		super();
		this.name = 'RequiredFieldError';
		this.message = 'A required field is missing';
	}
}

// error object for when the requested resource is not found
export class NonexistentResourceError extends Error {
	constructor(message: string) {
		super();
		this.name = 'NonexistentResourceError';
		this.message = message;
	}
}

// error object for when the Authorization header is missing or it does not contain a Bearer token
export class AuthHeaderError extends Error {
	constructor() {
		super();
		this.name = 'AuthHeaderError';
		this.message = 'Authorization header is missing, or it does not have a Bearer token';
	}
}

// error object for when incorrect password is provided
export class PasswordError extends Error {
	constructor() {
		super();
		this.name = 'PasswordError';
		this.message = 'Incorrect password provided';
	}
}

// error object for when a user tries to create an account with an email that is already in use
export class DuplicateUserError extends Error {
	constructor() {
		super();
		this.name = 'DuplicateUserError';
		this.message = 'A user with this email already exists';
	}
}
