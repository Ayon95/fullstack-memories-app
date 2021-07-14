import mongoose from 'mongoose';
import { UserDoc } from '../utils/types';

// create User schema
const userSchema = new mongoose.Schema<UserDoc>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
	// an array containing the ids of the posts created by the user
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
});

// create a User model
const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
