const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

router.post('/', auth, async (req, res) => {
    const { content, media } = req.body;
    try {
        const post = await Post.create({ content, media, author: req.user.username });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { content, media } = req.body;
    try {
        const post = await Post.findByPk(id);
        if (!post || post.author !== req.user.username) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        post.content = content;
        post.media = media;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post || post.author !== req.user.username) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
