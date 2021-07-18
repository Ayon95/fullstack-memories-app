import express from 'express';
import {
	createPost,
	deletePost,
	getPosts,
	getPostsBySearch,
	updateLikes,
	updatePost,
} from '../controllers/posts';
import authorizeUser from '../middleware/authorizeUser';

// creating an express router
const router = express.Router();

// setting up route handler for GET requests to the base route
router.get('/', authorizeUser, getPosts);

// route handler for GET requests to get posts based on search query params
router.get('/search', authorizeUser, getPostsBySearch);

// route handler for POST requests to the base route
router.post('/', authorizeUser, createPost);

// route handler for PATCH request to a specific post route
router.patch('/:id', authorizeUser, updatePost);

// route handler for PATCH request to update likes of a specific post
router.patch('/:id/likes', authorizeUser, updateLikes);

// route handler for DELETE request to a specific post route
router.delete('/:id', authorizeUser, deletePost);

export default router;
