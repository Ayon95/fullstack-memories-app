// This file contains all the handlers for post-related routes

import { Request, Response } from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { BasePost, PostDoc, UserDoc } from '../utils/types';

export async function getPosts(request: Request, response: Response) {
	try {
		// getting all the posts from the posts collection
		const posts = await Post.find();
		response.status(200).json(posts);
	} catch (error) {
		response.status(404).json({ errorMessage: 'The requested url does not exist' });
	}
}

export async function createPost(request: Request, response: Response) {
	// request.userId is a required property in this route handler
	// if it is missing, then that means there is a mistake here in the server
	if (!request.userId) {
		return response.status(500).json({ errorMessage: 'Internal server error' });
	}

	try {
		const user = (await User.findById(request.userId)) as UserDoc;

		const post: BasePost = request.body;
		// checking if a required field is missing or not
		if (![post.title, post.description].every(Boolean)) {
			return response.status(400).json({ errorMessage: 'A required field is missing' });
		}

		// creating a new post doc
		const newPost = await Post.create({
			...request.body,
			author: request.userId,
			likedBy: [],
			createdAt: new Date(),
		});

		// populating the author field of the newly-created post
		Post.populate(newPost, {
			path: 'author',
			select: { firstName: 1, lastName: 1 },
		});

		// adding the post id to the posts array of the user
		user.posts = [...user.posts, newPost._id];

		response.status(201).json(newPost);
	} catch (error) {
		response.status(409).json({ errorMessage: error.message });
	}
}

export async function updatePost(request: Request, response: Response) {
	const { id } = request.params;
	const post: BasePost = request.body;
	try {
		// checking if any post exists with the given id
		const postExists = await Post.exists({ _id: id });
		if (!postExists) {
			return response.status(404).json({ errorMessage: 'No post exists with the given id' });
		}

		// checking if a required field is missing
		if (![post.title, post.description].every(Boolean)) {
			return response.status(400).json({ errorMessage: 'A required field is missing' });
		}
		// updating the post doc
		// if new is set to true, the updated document will be returned
		const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
		return response.json(updatedPost);
	} catch (error) {
		return response.status(409).json({ errorMessage: error.message });
	}
}

export async function updateLikes(request: Request, response: Response) {
	if (!request.userId) {
		return response.status(500).json({ errorMessage: 'Internal server error' });
	}

	const { id } = request.params;

	// checking whether the post exists or not
	const postExists = await Post.exists({ _id: id });
	if (!postExists) {
		return response.status(404).json({ errorMessage: 'No post exists with the given id' });
	}

	// finding the post that the user wants to like or unlike
	const post = (await Post.findById(id)) as PostDoc;

	let updatedLikedBy: string[];

	// checking if the user has already liked this post
	// if so, then the user's id will be present in likedBy array
	const postIsLiked = post.likedBy.includes(request.userId);

	// add the user's id if the user hasn't liked the post already
	if (!postIsLiked) updatedLikedBy = [...post.likedBy, request.userId];
	// remove the user's id from the list if the user has already liked the post
	else updatedLikedBy = post.likedBy.filter(userId => userId !== request.userId);

	// updating only the likedBy field of the post
	const updatedPost = await Post.findByIdAndUpdate(id, { likedBy: updatedLikedBy }, { new: true });
	return response.json(updatedPost);
}

export async function deletePost(request: Request, response: Response) {
	if (!request.userId) {
		return response.status(500).json({ errorMessage: 'Internal server error' });
	}

	const { id } = request.params;

	// checking if any post with the id exists
	const postExists = await Post.exists({ _id: id });

	if (!postExists) {
		return response.status(404).json({ errorMessage: 'No post exists with the given id' });
	}

	// deleting the post doc from the database
	await Post.findByIdAndDelete(id);
	response.status(204).end();
}
