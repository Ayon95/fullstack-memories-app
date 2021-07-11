import express from 'express';
import { createPost, deletePost, getPosts, updateLikes, updatePost } from '../controllers/posts';

// creating an express router
const router = express.Router();

// setting up route handler for GET requests to the base route
router.get('/', getPosts);

// setting up route handler for POST requests to the base route
router.post('/', createPost);

// route handler for PUT request to a specific post route
router.put('/:id', updatePost);

// route handler for PUT request to update likes of a specific post
router.put('/:id/likes', updateLikes);

// route handler for DELETE request to a specific post route
router.delete('/:id', deletePost);

export default router;
