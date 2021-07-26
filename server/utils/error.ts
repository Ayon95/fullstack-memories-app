// error object for when the user does not provide a required field
export class RequiredFieldError extends Error {
	constructor() {
		super();
		this.name = 'RequiredFieldError';
		this.message = 'A required field is missing';
	}
}

// error object for when the requested resource is not found
export class NonexistentPostError extends Error {
	constructor() {
		super();
		this.name = 'NonexistentPostError';
		this.message = 'No post exists with the given id';
	}
}
