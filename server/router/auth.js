import express from 'express';
import 'express-async-errors';
import { body, param, query } from 'express-validator';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('username should be at least 5 characters'),
    validate,
];

// validation
// sanitization
// Contract Testing : Client-Server
// Proto base
const validateSignup = [
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid Url')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
];

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/signup
router.post('/login', validateCredential, authController.login);

// GET / auth/me
router.get('/me', isAuth, authController.me);

export default router;
