const { Router } = require('express');
const Comment = require('../models/').comment;
const User = require('../models/').user;

const router = new Router();

router.route('/').post(async (req, res, next) => {
    try {
        const { text, snippetId, userId } = req.body;
        const comment = await Comment.create({
            userId,
            snippetId,
            text
        });
        const commentToSend = await comment.reload({
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'email', 'createdAt', 'updatedAt']
                }
            }
        });
        return res.status(200).send(commentToSend);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
