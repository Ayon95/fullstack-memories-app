// This file contains all the handlers for post-related routes

import { Request, Response } from 'express';
import Post from '../models/post';

export async function getPosts(request: Request, response: Response) {
	try {
		// getting all the posts from the posts collection
		const posts = await Post.find();
		response.status(200).json(posts);
	} catch (error) {
		response.status(404).json({ error: error.message });
	}
}

export async function createPost(request: Request, response: Response) {
	try {
		// creating a new post document
		const newPost = new Post(request.body);
		// saving the new post doc to the posts collection
		await newPost.save();
		response.status(201).json(newPost);
	} catch (error) {
		response.status(409).json({ error: error.message });
	}
}
