// This file contains all the handlers for post-related routes

import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Post from '../models/Post';
import { BasePost, PostDoc, SearchQuery } from '../utils/types';

export async function getPosts(
	request: Request<ParamsDictionary, any, any, { page: string }>,
	response: Response
) {
	const page = Number.parseFloat(request.query.page);
	// want to have 6 posts per page
	const limit = 6;
	// the index of the very first item of the page
	const startIndex = (page - 1) * limit;
	try {
		// getting the count of all posts
		const total = await Post.countDocuments({});
		// getting a specific number of posts starting from the start index (we don't want to get posts from previous pages)
		// sorting the posts from newest to oldest
		// also populating the author field of each post with _id, firstName, and lastName
		const posts = await Post.find({})
			.skip(startIndex)
			.limit(limit)
			.sort({ createdAt: -1 })
			.populate('author', { _id: 1, firstName: 1, lastName: 1 });
		response.json({ posts, currentPage: page, totalNumPages: Math.ceil(total / limit) });
	} catch (error) {
		console.log(error);
		response.status(404).json({ errorMessage: 'The requested url does not exist' });
	}
}

export async function getPostsBySearch(
	request: Request<ParamsDictionary, any, any, SearchQuery>,
	response: Response
) {
	try {
		// getting the query params
		const { searchTerm, tags } = request.query;
		// converting the searchTerm to a regex, and making it case-insensitive
		// since it is a regex, mongoose will simply check whether the title field value matches this regex
		const title = new RegExp(searchTerm, 'i');
		// converting the tags string into an array
		const tagsArray = tags.split(',');
		// getting the posts where either their title matches the search term
		// or one of their tags is present in the list of tags that were passed
		// if both search term and tags are specified, then all posts satisfying any of the two conditions will be selected
		const posts = await Post.find({
			$or: [{ title: title }, { tags: { $in: tagsArray } }],
		}).populate('author', { _id: 1, firstName: 1, lastName: 1 });

		response.json(posts);
	} catch (error) {
		response.status(404).json({ errorMessage: error.message });
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
			...post,
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
