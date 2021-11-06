const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Like = require('../models/').like;
const { Op } = require('sequelize');
const authMiddleware = require('../auth/middleware');

const router = new Router();

router
    .route('/:id')
    .post(authMiddleware, async (req, res, next) => {
        try {
            const likedSnippetId = parseInt(req.params.id);
            const userId = parseInt(req.user.id);
            const snippet = await Snippet.findByPk(likedSnippetId);
            if (!snippet) return res.status(404).send('Snippet not found');
            const like = await Like.create({
                userId: userId,
                snippetId: likedSnippetId
            });
            return res.status(200).send(like);
        } catch (err) {
            next(err);
        }
    })
    .delete(authMiddleware, async (req, res, next) => {
        try {
            const userId = parseInt(req.user.id);
            const removeLikeId = parseInt(req.params.id);
            const like = await Like.findOne({
                where: {
                    [Op.and]: [{ userId: userId }, { snippetId: removeLikeId }]
                }
            });
            console.log(like);
            if (!like) return res.status(404).send('Like not found');
            await like.destroy();
            return res.status(200).send('Like removed successfully');
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
