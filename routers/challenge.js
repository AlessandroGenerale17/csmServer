const { Router } = require('express');
const Challenge = require('../models/').challenge;
const Difficulty = require('../models/').difficulty;
const Language = require('../models/').language;
const Testcase = require('../models/').testcase;

const router = new Router();

router.route('/').get(async (req, res, next) => {
    try {
        const challenges = await Challenge.findAll({
            include: [Difficulty, Language]
        });
        return res.status(200).send(challenges);
    } catch (err) {
        next(err);
    }
});

router.route('/:id').get(async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const challenge = await Challenge.findByPk(id, {
            include: [Testcase]
        });
        if (!challenge) return res.status(404).send('Challenge not found');
        return res.status(200).send(challenge);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
