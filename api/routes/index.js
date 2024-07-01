const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { knexMiddleware } = require('./../libs/knex');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/healthy', async (req, res) => {
  await res.json({
    code: 0,
    status: 'ok',
    data: {
      time: Date.now(),
    }
  })
});

router.use('/', knexMiddleware, require('./profile'));
router.use('/', knexMiddleware, require('./notes'));

module.exports = router;
