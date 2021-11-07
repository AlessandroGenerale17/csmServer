const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Language = require('../models/').language;
const User = require('../models/').user;
const Like = require('../models/').like;
const Comment = require('../models/').comment;
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
                },
                {
                    model: Comment,
                    attributes: {
                        exclude: ['updatedAt']
                    }
                }
            ]
        });
        return res.status(200).send(publicSnippets);
    } catch (err) {
        next(err);
    }
});

router.route('/:id').get(async (req, res, next) => {
    try {
        const snippetId = parseInt(req.params.id);
        const snippet = await Snippet.findByPk(snippetId, {
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
                },
                {
                    model: Comment,
                    attributes: {
                        exclude: ['updatedAt']
                    }
                }
            ]
        });
        if (!snippet) return res.status(404).send('Snippet not found');
        return res.status(200).send(snippet);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
