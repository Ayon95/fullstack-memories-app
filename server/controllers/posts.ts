// This file contains all the handlers for post-related routes

import { Request, Response } from 'express';
import Post from '../models/Post';
import { BasePost, PostDoc } from '../utils/types';

export async function getPosts(request: Request, response: Response) {
	try {
		// getting all the posts from the posts collection
		// also populating the author field of each post with _id, firstName, and lastName
		const posts = await Post.find().populate('author', { _id: 1, firstName: 1, lastName: 1 });
		response.json(posts);
	} catch (error) {
		console.log(error);
		response.status(404).json({ errorMessage: 'The requested url does not exist' });
	}
}

export async function createPost(request: Request, response: Response) {
	// if code reaches this point, then I know for sure that user will not be undefined
	const user = request.user!;

	try {
		const post: BasePost = request.body;
		// checking if a required field is missing or not
		if (![post.title, post.description].every(Boolean)) {
			return response.status(400).json({ errorMessage: 'A required field is missing' });
		}

		// creating a new post doc
		const newPost = await Post.create({
			...request.body,
			author: user._id,
			likedBy: [],
			createdAt: new Date(),
		});

		// populating the author field of the newly-created post
		await Post.populate(newPost, {
			path: 'author',
			select: { _id: 1, firstName: 1, lastName: 1 },
		});

		// adding the post id to the posts array of the user
		user.posts = [...user.posts, newPost._id];

		// saving the user
		await user.save();

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

		// populating the author field of the updated post
		await Post.populate(updatedPost, {
			path: 'author',
			select: { _id: 1, firstName: 1, lastName: 1 },
		});

		return response.json(updatedPost);
	} catch (error) {
		return response.status(409).json({ errorMessage: error.message });
	}
}

export async function updateLikes(request: Request, response: Response) {
	const { id } = request.params;
	const user = request.user!;
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
	const postIsLiked = post.likedBy.includes(user._id);

	// add the user's id if the user hasn't liked the post already
	if (!postIsLiked) updatedLikedBy = [...post.likedBy, user._id];
	// remove the user's id from the list if the user has already liked the post
	else {
		updatedLikedBy = post.likedBy.filter(userId => userId.toString() !== user._id.toString());
	}

	// updating only the likedBy field of the post
	const updatedPost = await Post.findByIdAndUpdate(id, { likedBy: updatedLikedBy }, { new: true });

	// populating the author field of the updated post
	await Post.populate(updatedPost, {
		path: 'author',
		select: { _id: 1, firstName: 1, lastName: 1 },
	});

	return response.json(updatedPost);
}

export async function deletePost(request: Request, response: Response) {
	const user = request.user!;
	const { id } = request.params;

	// checking if any post with the id exists
	const postExists = await Post.exists({ _id: id });

	if (!postExists) {
		return response.status(404).json({ errorMessage: 'No post exists with the given id' });
	}

	// deleting the post doc from the database
	await Post.findByIdAndDelete(id);

	// removing the post id from the user's posts array
	user.posts = user.posts.filter(postId => postId !== id);
	await user.save();
	response.status(204).end();
}
