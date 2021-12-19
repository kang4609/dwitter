import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

// secretkey : https://www.lastpass.com/features/password-generator 에서 32bit로 생성

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;

    const found = await userRepository.findByUsername(username);
    if (found) {
        return res.status(409).json({ message: `${username} already exists` });
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    console.log(hashed);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
}
export async function login(req, res) {
    const { username, password } = req.body;
    console.log(`password=${password} : username = ${username}`);
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return res.status(401).json({ message: 'Invaild user or password' });
    }

    console.log(`password=${password} : user.password = ${user.password}`);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invaild user or password' });
    }

    const token = createJwtToken(user.id);

    res.status(200).json({ token, username });
}

function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);

    if (!user) {
        return res.status(201).josn({ message: 'User not Found' });
    }

    res.status(200).json({ token: req.token, username: user.username });
}
