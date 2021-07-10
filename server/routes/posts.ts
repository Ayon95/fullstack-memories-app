import express from 'express';
import { createPost, getPosts, updatePost } from '../controllers/posts';

// creating an express router
const router = express.Router();

// setting up route handler for GET requests to the base route
router.get('/', getPosts);

// setting up route handler for POST requests to the base route
router.post('/', createPost);

// route handler for PUT request to a specific post route
router.put('/:id', updatePost);

export default router;
