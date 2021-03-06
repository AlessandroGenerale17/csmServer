const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Language = require('../models/').language;
const User = require('../models/').user;
const Comment = require('../models/').comment;
const Like = require('../models/').like;
const authMiddleware = require('../auth/middleware');
const { findRoom, getAllRooms } = require('../sockets/index');

const router = new Router();

router
    .route('/')
    .get(authMiddleware, async (req, res, next) => {
        try {
            // from auth middleware get the id of the user and fetch all his snippets
            const id = req.user.id;
            // include language
            const [snippets, likesWithSnippets] = await Promise.all([
                Snippet.findAll({
                    where: {
                        userId: id
                    },
                    include: [Language]
                }),
                Like.findAll({
                    where: {
                        userId: id
                    },
                    include: [
                        {
                            model: Snippet,
                            include: [Language, User]
                        }
                    ]
                })
            ]);

            const likedSnippets = likesWithSnippets.map((like) => like.snippet);

            return res
                .status(200)
                .send({ snippets: snippets, likedSnippets: likedSnippets });
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const idsArray = req.headers.data
                .split(',')
                .map((id) => parseInt(id));
            if (idsArray.length <= 1) {
                return res
                    .status(400)
                    .send(
                        'Bad request, this route deletes many items, only one was passed. Check other route /snippet/:id'
                    );
            }
            await Snippet.destroy({
                where: { id: idsArray }
            });
            return res.status(200).send('Deleted snippets');
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            // FIXME userId from auth
            const {
                title,
                description,
                code,
                userId,
                languageId,
                public,
                issue
            } = req.body;
            const newSnippet = await Snippet.create({
                title,
                description,
                code,
                userId,
                languageId,
                public,
                issue
            });
            const snippetToSend = await newSnippet.reload({
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
                ],
                order: [[{ model: Comment }, 'createdAt', 'DESC']]
            });
            return res.status(200).send(snippetToSend);
        } catch (err) {
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const snippet = await Snippet.findByPk(id, {
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
                ],
                order: [[{ model: Comment }, 'createdAt', 'DESC']]
            });
            if (!snippet) return res.status(404).send('Snippet not found');
            return res.status(200).send(snippet);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const snippet = await Snippet.findByPk(id);
            if (!snippet) return res.status(404).send('Snippet not found');
            await snippet.destroy();
            return res.status(200).send('Snippet deleted');
        } catch (err) {
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const snippet = await Snippet.findByPk(id);
            if (!snippet) return res.status(404).send('Snippet not found');
            const updatedSnippet = await snippet.update({ ...req.body });
            const snippetToSend = await updatedSnippet.reload({
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
                ],
                order: [[{ model: Comment }, 'createdAt', 'DESC']]
            });

            // find the room
            const room = findRoom(id.toString());
            // if there is a room broadcast to all users
            if (room) req.io.to(room.id).emit('snip_update', snippetToSend);

            return res.status(200).send(snippetToSend);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
