const { Router } = require('express');
const Snippet = require('../models/').snippet;
const Language = require('../models/').language;
const authMiddleware = require('../auth/middleware');

const router = new Router();

router
    .route('/')
    .get(authMiddleware, async (req, res, next) => {
        try {
            // from auth middleware get the id of the user and fetch all his snippets
            const id = req.user.id;
            // include language
            const snippets = await Snippet.findAll({
                where: {
                    userId: id
                },
                include: [Language]
            });
            return res.status(200).send(snippets);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            if (req.body.snippets.length > 1) {
                return res.status(200);
            }
            return res.status(200).send('I received');
            // Model.destroy({ where: { id: [1,2,3,4] }})
        } catch (err) {
            next(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const snippet = await Snippet.findByPk(id);
            if (!snippet) return res.status(404).send('Snippet not found');
            return res.status(200).send(snippet);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
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
            return res.status(200).send(updatedSnippet);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
