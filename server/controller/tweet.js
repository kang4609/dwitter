import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

//GET /tweets?username=:username

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

//GET /tweets/:id
export async function getTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `Tweet (${id}) not found` });
    }
}

// POST /tweets
export async function createTweet(req, res) {
    const { text, userId } = req.body;

    const tweet = await tweetRepository.create(text, userId);
    res.status(201).json(tweet);
    getSocketIO().emit('tweets-creation', { commend: 'created', tweet });
}

// PUT /tweets/:id
export async function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;

    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }

    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}
// DELETE /tweets/:id
export async function deleteTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }

    await tweetRepository.remove(id);
    res.sendStatus(204);
}
