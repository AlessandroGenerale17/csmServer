const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Language = require('../models/').language;
const User = require('../models/').user;
const Like = require('../models/').like;
const { Op } = require('sequelize');
const router = new Router();

// get all public snippets for home feed
router.route('/').get(async (req, res, next) => {
    try {
        const publicSnippets = await Snippet.findAll({
            where: { public: true },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'email', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: Language
                },
                {
                    model: Like,
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    }
                    // include: {
                    //     model: User,
                    //     attributes: { exclude: ['password', 'email', 'createdAt', 'updatedAt']}
                    // }
                }
            ]
        });
        return res.status(200).send(publicSnippets);
    } catch (err) {
        next(err);
    }
});

router
    .route('/like/:id')
    .post(async (req, res, next) => {
        try {
            // by who is it liked
            const userId = 1;
            const likedSnippetId = parseInt(req.params.id);
            const snippet = await Snippet.findOne({
                where: {
                    userId: userId
                }
            });
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
    .delete(async (req, res, next) => {
        try {
            const userId = 1;
            const removeLikeId = parseInt(req.params.id);
            console.log(removeLikeId);
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