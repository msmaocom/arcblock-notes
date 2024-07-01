const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.get('/notes', async (req, res) => {
  const notes = await req.knex('notes').select('*')
  await res.json({
    code: 0,
    status: 'ok',
    data: notes,
  })
});

router.get('/notes/:id', async (req, res) => {
  const notes = await req.knex('notes').where({ id: req.params.id }).select('*')
  await res.json({
    code: 0,
    status: 'ok',
    data: notes[0] || {}
  })
});


router.post('/notes', [
  body('title').isLength({ min: 1, max: 255 }).withMessage('title must be at 1 ~ 255 characters long'),
  body('content').isLength({ min: 1 }).withMessage('content must be at least 1 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: 400, status: 'error', errors: errors.array() });
  }
  const { title, content, user_id } = req.body;
  const result = await req.knex('notes').insert({ title, content, user_id })
  await res.json({
    code: 0,
    status: 'ok',
    data: {}
  })
});


router.put('/notes/:id', [
  body('title').isLength({ min: 1, max: 255 }).withMessage('title must be at 1 ~ 255 characters long'),
  body('content').isLength({ min: 1 }).withMessage('content must be at least 1 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: 400, status: 'error', errors: errors.array() });
  }
  const { title, content } = req.body;
  let notes = []
  let trx = await req.trxProvider();
  try {
    notes = await trx('notes').where({ id: req.params.id }).select('*')
    if (notes && notes[0] && notes[0].id) {
      await trx('notes').where({ id: req.params.id }).update({ title, content })
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


router.delete('/notes/:id', async (req, res) => {
  let trx = await req.trxProvider();
  try {
    let notes = await trx('notes').where({ id: req.params.id }).select('*')
    if (notes && notes[0] && notes[0].id) {
      await trx('notes').where({ id: req.params.id }).del()
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