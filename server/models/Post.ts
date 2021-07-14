import mongoose from 'mongoose';
import { PostDoc } from '../utils/types';

// schema for post documents
const postSchema = new mongoose.Schema<PostDoc>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, required: true },
	tags: [String],
	selectedFile: String,
	// an array containing the ids of the users who will like the post
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	createdAt: { type: Date },
});

// create a Post model based on the post schema
const Post = mongoose.model<PostDoc>('Post', postSchema);

export default Post;
