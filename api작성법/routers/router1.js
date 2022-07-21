const { PATH, handler_1, middleware, router, testModel } = require('../index');

router.all(PATH.ROOT, middleware.inRouter)
router.post(PATH.ROOT, middleware.inRouterMethod, handler_1.addPost(testModel))
router.delete();
router.patch();
router.put();

module.exports = router;