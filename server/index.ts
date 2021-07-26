import 'dotenv/config';
import config from './utils/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';
import userRoutes from './routes/user';
import { OAuth2Client } from 'google-auth-library';
import handleError from './middleware/handleError';

// create an express app
const app = express();

// creating a google oauth client object
export const googleOAuthClient = new OAuth2Client(config.GOOGLE_OAUTH_CLIENT_ID);

// connect app to mongoose
mongoose
	.connect(config.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log('Connected to MongoDB database'))
	.catch(error => console.log(`Failed to connect to database: ${error.message}`));

// enable json body parser
app.use(express.json({ limit: '30mb' }));

// enable body parser for url-encoded bodies
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// enable CORS - this needs to be before you apply routes
app.use(cors());

// applying routes related to posts
app.use('/posts', postRoutes);

// applying routes related to user authentication and authorization
app.use('/user', userRoutes);

// applying middleware to handle requests to unknown endpoints
app.use((request: Request, response: Response) => {
	response.status(404).json({ errorMessage: 'The url does not exist' });
});

// applying the error-handler middleware
app.use(handleError);

// listen for requests on the specified port
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}...`);
});
