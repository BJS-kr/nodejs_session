const router = require('express').Router();
const { PATH, handler } = require('./index');

router
  .route(PATH.SAME)
  .get(handler.test2SameGet)
  .post(handler.test2SamePost);

router.get(PATH.THROW, handler.test2Throw);

module.exports = router;