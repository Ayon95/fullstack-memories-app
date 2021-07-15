import mongoose from 'mongoose';
import { NativeUserDoc } from '../../utils/types';
import BaseUser from './BaseUser';

const nativeUserSchema = new mongoose.Schema<NativeUserDoc>({
	passwordHash: { type: String, required: true },
});

const NativeUser = BaseUser.discriminator('NativeUser', nativeUserSchema);

export default NativeUser;
