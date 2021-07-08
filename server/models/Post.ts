import mongoose from 'mongoose';

// schema for post documents
const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String,
	tags: [String],
	selectedFile: String,
	likes: { type: Number, default: 0 },
	createdAt: { type: Date, default: new Date() },
});

// create a Post model based on the post schema
const Post = mongoose.model('Post', postSchema);

export default Post;
