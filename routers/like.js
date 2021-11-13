const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Like = require('../models/').like;
const User = require('../models/').user;
const Language = require('../models/').language;
const Comment = require('../models/').comment;
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

            const snippetToSend = await snippet.reload({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: [
                                'password',
                                'email',
                                'createdAt',
                                'updatedAt'
                            ]
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
                    },
                    {
                        model: Comment,
                        attributes: {
                            exclude: ['updatedAt']
                        },
                        include: {
                            model: User,
                            attributes: {
                                exclude: ['updatedAt', 'email', 'password']
                            }
                        }
                    }
                ]
            });
            return res
                .status(200)
                .send({ like: like, likedSnippet: snippetToSend });
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
