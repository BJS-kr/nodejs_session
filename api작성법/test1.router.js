const router = require('express').Router();
const { PATH, handler, middleware } = require('./index');

router.all(PATH.ROOT, middleware.test1)
router.post(PATH.ROOT, middleware.test1Post, handler.test1Post)

module.exports = router;