import mongoose, { Document } from 'mongoose';
import { PostDoc } from '../utils/types';

// schema for post documents
const postSchema = new mongoose.Schema<PostDoc>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, required: true },
	tags: [String],
	selectedFile: String,
	likes: { type: Number, default: 0 },
	createdAt: { type: Date },
});

// create a Post model based on the post schema
const Post = mongoose.model<PostDoc>('Post', postSchema);

export default Post;
