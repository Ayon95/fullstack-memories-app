// This file contains all the handlers for post-related routes

import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Comment from '../models/Comment';
import Post from '../models/Post';
import config from '../utils/config';
import { NonexistentResourceError, RequiredFieldError } from '../utils/error';
import { getPaginatedPosts } from '../utils/helpers';
import { BasePost, GetPostParams, PostDoc, SearchQuery } from '../utils/types';

export async function getPosts(
	request: Request<ParamsDictionary, any, any, { page: string }>,
	response: Response,
	next: NextFunction
) {
	const page = Number.parseFloat(request.query.page);
	try {
		const posts = await getPaginatedPosts(page);
		// getting the count of all posts
		const total = await Post.countDocuments({});
		response.json({ posts, totalNumPages: Math.ceil(total / config.POSTS_PER_PAGE) });
	} catch (error) {
		next(error);
	}
}

export async function getPostsBySearch(
	request: Request<ParamsDictionary, any, any, SearchQuery>,
	response: Response,
	next: NextFunction
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
		})
			.sort({ _id: -1 })
			.populate(config.POST_POPULATE_OPTIONS);
		return response.json(posts);
	} catch (error) {
		next(error);
	}
}

export async function getPost(
	request: Request<GetPostParams>,
	response: Response,
	next: NextFunction
) {
	const { id } = request.params;

	try {
		const post = await Post.findById(id).populate(config.POST_POPULATE_OPTIONS);

		if (!post) {
			throw new NonexistentResourceError('No post exists with the given id');
		}

		return response.json(post);
	} catch (error) {
		next(error);
	}
}

export async function createPost(request: Request, response: Response, next: NextFunction) {
	// if code reaches this point, then I know for sure that user will not be undefined
	const user = request.user!;
	try {
		const post: BasePost = request.body;
		// checking if a required field is missing or not
		if (![post.title, post.description].every(Boolean)) {
			throw new RequiredFieldError();
		}
		// creating a new post doc
		const newPost = await Post.create({
			...post,
			author: user._id,
			likedBy: [],
			comments: [],
			createdAt: new Date(),
		});
		// adding the post id to the posts array of the user
		user.posts = [...user.posts, newPost._id];
		// saving the user
		await user.save();
		// Need to send a list of paginated posts
		// page is 1 because the first page needs to be displayed (the newly-created post will be the very first post)
		const posts = await getPaginatedPosts(1);
		const total = await Post.countDocuments({});
		response.json({ posts, totalNumPages: Math.ceil(total / config.POSTS_PER_PAGE) });
	} catch (error) {
		next(error);
	}
}

export async function addComment(
	request: Request<ParamsDictionary, any, { comment: string }>,
	response: Response,
	next: NextFunction
) {
	const { id } = request.params;
	const user = request.user!;

	if (!request.body.comment) {
		throw new RequiredFieldError();
	}

	try {
		const post = await Post.findById(id);
		if (!post) {
			throw new NonexistentResourceError('No post exists with the given id');
		}

		const newComment = await Comment.create({
			postId: post._id,
			comment: request.body.comment,
			author: user._id,
			createdAt: new Date(),
		});
		// adding the id of the new comment to the post's comments array
		post.comments = [...post.comments, newComment._id];
		// saving the post
		await post.save();
		// populating the author and comments fields of post
		// inside each comment, we are populating the author field
		await Post.populate(post, config.POST_POPULATE_OPTIONS);

		response.status(201).json(post);
	} catch (error) {
		next(error);
	}
}

export async function updatePost(request: Request, response: Response, next: NextFunction) {
	const { id } = request.params;
	const post: BasePost = request.body;
	try {
		// checking if any post exists with the given id
		const postExists = await Post.exists({ _id: id });
		if (!postExists) {
			throw new NonexistentResourceError('No post exists with the given id');
		}
		// checking if a required field is missing
		if (![post.title, post.description].every(Boolean)) {
			throw new RequiredFieldError();
		}
		// updating the post doc
		// if new is set to true, the updated document will be returned
		const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
		// populating the author and comments fields of the updated post
		await Post.populate(updatedPost, config.POST_POPULATE_OPTIONS);

		response.json(updatedPost);
	} catch (error) {
		next(error);
	}
}

export async function updateLikes(request: Request, response: Response, next: NextFunction) {
	const { id } = request.params;
	const user = request.user!;
	try {
		// checking whether the post exists or not
		const postExists = await Post.exists({ _id: id });
		if (!postExists) {
			throw new NonexistentResourceError('No post exists with the given id');
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
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likedBy: updatedLikedBy },
			{ new: true }
		);

		await Post.populate(updatedPost, config.POST_POPULATE_OPTIONS);

		response.json(updatedPost);
	} catch (error) {
		next(error);
	}
}

export async function deletePost(
	request: Request<ParamsDictionary, any, any, { page: string }>,
	response: Response,
	next: NextFunction
) {
	const user = request.user!;
	const { id } = request.params;
	try {
		// checking if any post with the id exists
		const postExists = await Post.exists({ _id: id });

		if (!postExists) {
			throw new NonexistentResourceError('No post exists with the given id');
		}
		// deleting the post doc from the database
		await Post.findByIdAndDelete(id);
		// removing the post id from the user's posts array
		user.posts = user.posts.filter(postId => postId !== id);
		await user.save();
		// Need to send a list of paginated posts
		const page = Number.parseFloat(request.query.page);
		const posts = await getPaginatedPosts(page);
		const total = await Post.countDocuments({});

		response.json({ posts, totalNumPages: Math.ceil(total / config.POSTS_PER_PAGE) });
	} catch (error) {
		next(error);
	}
}
