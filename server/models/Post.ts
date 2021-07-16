import mongoose from 'mongoose';
import { PostDoc } from '../utils/types';

// schema for post documents
const postSchema = new mongoose.Schema<PostDoc>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseUser' },
	tags: [String],
	selectedFile: String,
	// an array containing the ids of the users who will like the post
	likedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BaseUser',
		},
	],
	createdAt: { type: Date },
});

// create a Post model based on the post schema
const Post = mongoose.model<PostDoc>('Post', postSchema);

export default Post;
