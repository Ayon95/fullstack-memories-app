import express from 'express';
import { createPost, getPosts } from '../controllers/posts';

// creating an express router
const router = express.Router();

// setting up route handler for GET requests to the base route
router.get('/', getPosts);

// setting up route handler for POST requests to the base route
router.post('/', createPost);

export default router;
