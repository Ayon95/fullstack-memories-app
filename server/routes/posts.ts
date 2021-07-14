import express from 'express';
import { createPost, deletePost, getPosts, updateLikes, updatePost } from '../controllers/posts';
import authorizeUser from '../middleware/authorizeUser';

// creating an express router
const router = express.Router();

// setting up route handler for GET requests to the base route
router.get('/', authorizeUser, getPosts);

// setting up route handler for POST requests to the base route
router.post('/', authorizeUser, createPost);

// route handler for PUT request to a specific post route
router.put('/:id', authorizeUser, updatePost);

// route handler for PUT request to update likes of a specific post
router.put('/:id/likes', authorizeUser, updateLikes);

// route handler for DELETE request to a specific post route
router.delete('/:id', authorizeUser, deletePost);

export default router;
