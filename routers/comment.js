const { Router } = require('express');
const Comment = require('../models/').comment;
const User = require('../models/').user;
const authMiddleware = require('../auth/middleware');

const router = new Router();

router.route('/').post(authMiddleware, async (req, res, next) => {
    try {
        const { text, snippetId } = req.body;
        const userId = parseInt(req.user.id);
        const comment = await Comment.create({
            snippetId,
            userId,
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
