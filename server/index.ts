import config from './utils/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts';

// create an express app
const app = express();

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

// enable CORS
app.use(cors());

// applying routes related to posts
app.use('/posts', postRoutes);

// listen for requests on the specified port
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}...`);
});
