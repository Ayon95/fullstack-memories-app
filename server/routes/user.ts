import express from 'express';
import { logIn, logInGoogle, signUp } from '../controllers/user';

// creating a router
const router = express.Router();

// route handler for POST request to log an existing user in
router.post('/login', logIn);

// route handler for POST request to sign up (create a new user)
router.post('/signup', signUp);

// route handler for POST request to log in with Google
router.post('/login-google', logInGoogle);

export default router;
