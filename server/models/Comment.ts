import mongoose from 'mongoose';
import { CommentDoc } from '../utils/types';

const commentSchema = new mongoose.Schema<CommentDoc>({
	postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
	comment: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseUser', required: true },
	createdAt: { type: Date, required: true },
});

const Comment = mongoose.model<CommentDoc>('Comment', commentSchema);

export default Comment;
