import mongoose from 'mongoose';
import { GoogleUserDoc } from '../../utils/types';
import BaseUser from './BaseUser';

const googleUserSchema = new mongoose.Schema<GoogleUserDoc>({
	googleId: { type: String, required: true },
});

const GoogleUser = BaseUser.discriminator('GoogleUser', googleUserSchema);

export default GoogleUser;
