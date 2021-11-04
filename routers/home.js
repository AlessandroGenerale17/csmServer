const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Language = require('../models/').language;
const User = require('../models/').user;
const router = new Router();

// get all public snippets
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
                }
            ]
        });
        return res.status(200).send(publicSnippets);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
