import mongoose from 'mongoose';
import { BaseUserDoc } from '../../utils/types';

/* Each document inheriting this schema will have a 'userType' field.
The value of userType will be the name of the model that inherits baseUserSchema.
The name of the collection will be 'users'.
*/
const options = { discriminatorKey: 'userType', collection: 'users' };

const baseUserSchema = new mongoose.Schema<BaseUserDoc>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		// an array containing the ids of the posts created by the user
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	options
);

const BaseUser = mongoose.model<BaseUserDoc>('BaseUser', baseUserSchema);

export default BaseUser;
