const { Router } = require('express');
const Question = require('../models/').question;

const router = new Router();

/* all questions */
router.route('/').get(async (req, res, next) => {
    try {
        const questions = await Question.findAll();
        return res.status(200).send(questions);
    } catch (err) {
        next(err);
    }
});

/* a question */
router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            const questionId = parseInt(req.params.id);
            const question = await Question.findByPk(questionId);

            if (question) return res.status(200).send(question);
            return res.status(404).send({ message: 'Question not found' });
        } catch (err) {
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const questionId = parseInt(req.params.id);
            const question = await Question.findByPk(questionId);
            if (question) {
                const updatedQuestion = question.update({
                    prompt: req.body.prompt
                });
                return res.status(200).send(updatedQuestion);
            }
            return res.status(404).send({ message: 'Question not found' });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
