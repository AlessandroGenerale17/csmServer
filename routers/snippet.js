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
            console.log('hello from post');
            const { title, description, code, userId, languageId } = req.body;
            const newSnippet = await Snippet.create({
                title,
                description,
                code,
                userId,
                languageId
            });
            const snippetToSend = await newSnippet.reload({
                include: [Language]
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
            const snippet = await Snippet.findByPk(id, { include: [Language] });
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
            snippet.destroy();
            return res.status(200).send('Snippet deleted');
        } catch (err) {
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            console.log('req body', req.body);
            const id = parseInt(req.params.id);
            const snippet = await Snippet.findByPk(id);
            if (!snippet) return res.status(404).send('Snippet not found');
            const updatedSnippet = await snippet.update({ ...req.body });
            const snippetToSend = await updatedSnippet.reload({
                include: [Language]
            });
            return res.status(200).send(snippetToSend);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
