// This file contains all the handlers for post-related routes

import { Request, Response } from 'express';

export function getPosts(request: Request, response: Response) {
	return response.send('Hello, world!');
}
