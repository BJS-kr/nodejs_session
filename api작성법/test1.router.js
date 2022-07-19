const { PATH, handler, middleware, router, testModel } = require('./index');

router.all(PATH.ROOT, middleware.test1)
router.post(PATH.ROOT, middleware.test1Post, handler.test1Post(testModel))

module.exports = router;