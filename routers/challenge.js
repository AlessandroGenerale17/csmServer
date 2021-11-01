const { Router } = require('express');
const Challenge = require('../models/').challenge;
const Difficulty = require('../models/').difficulty;
const Language = require('../models/').language;

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

module.exports = router;
