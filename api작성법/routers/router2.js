const { PATH, handler_2, router } = require('../index');

router
  .route(PATH.SAME)
    .get(handler_2.sameGet)
    .post(handler_2.samePost);

router.get(PATH.THROW, handler_2.throw);

module.exports = router;