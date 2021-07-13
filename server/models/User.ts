import mongoose from 'mongoose';
import { UserDoc } from '../utils/types';

// create User schema
const userSchema = new mongoose.Schema<UserDoc>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
});

// create a User model
const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
