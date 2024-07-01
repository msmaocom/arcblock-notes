const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.get('/profile', async (req, res) => {
  const users = await req.knex('users').where({ id: 1 }).select('*')
  await res.json({
    code: 0,
    status: 'ok',
    data: users[0] || {}
  })
});

router.put('/profile/:id', [
  body('username').isLength({ min: 1, max: 255 }).withMessage('title must be at 1 ~ 255 characters long'),
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be an integer between 1 and 120'),
  body('phone').matches(/^1[3-9]\d{9}$/).withMessage('Phone is not valid'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('summary').isLength({ max: 255 }).withMessage('title must be at 0 ~ 255 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: 400, status: 'error', errors: errors.array() });
  }
  const { username, age, phone, email, summary } = req.body;
  let users = []
  let trx = await req.trxProvider();
  try {
    users = await trx('users').where({ id: req.params.id }).select('*')
    if (users && users[0] && users[0].id) {
      await trx('users').where({ id: req.params.id }).update({ username, age, phone, email, summary })
    }
    await trx.commit();
  } catch (error) {
    await trx.rollback();
  }
  await res.json({
    code: 0,
    status: 'ok',
    data: {}
  })
});


module.exports = router;