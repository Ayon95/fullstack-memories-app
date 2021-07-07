import express from 'express';
import { getPosts } from '../controllers/posts';

// creating an express router
const router = express.Router();

// defining route handler for GET requests to the base route
router.get('/', getPosts);

export default router;
