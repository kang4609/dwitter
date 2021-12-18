import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';
const AUTH_ERROR = { message: 'Authentication' };

export const isAuth = async (req, res, next) => {
    const authHearder = req.get('Authorization');
    if (!(authHearder && authHearder.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHearder.split(' ')[1];

    jwt.verify(token, config.jwt.secretKey, async (error, decode) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }

        const user = await userRepository.findById(decode.id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }

        req.userId = user.id;
        next();
    });
};
