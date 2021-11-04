const { Router } = require('express');

const Language = require('../models/').language;

const router = new Router();

router.route('/').get(async (req, res, next) => {
    try {
        const languages = await Language.findAll();
        return res.status(200).send(languages);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
