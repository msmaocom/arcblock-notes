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

router.use('/init', knexMiddleware, async (req, res) => {
  let trx = await req.trxProvider();
  try {
    await trx.raw(`
      CREATE TABLE "users"(
        "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
        "username" varchar(255),
        "age" integer(10),
        "summary" varchar(255),
        "phone" varchar(255),
        "email" varchar(255)
      );
    `);

    await trx.raw(`
      CREATE UNIQUE INDEX "users_email_unique"
      ON "users"(
        "email" ASC
      );
    `);

    await trx.raw(`
      CREATE UNIQUE INDEX "users_phone_unique"
      ON "users"(
        "phone" ASC
      );
    `);

    await trx.raw(`
      CREATE TABLE "notes" (
        "id" integer not null primary key autoincrement,
        "user_id" integer(10),
        "title" varchar(255),
        "content" varchar(100000)
      );
    `);

    await trx.raw(`
      INSERT INTO "main"."users"("id", "username", "age", "summary", "phone", "email") VALUES(1, 'zhangsan', 10, 'summary 01', '13156781234', 'zhangsan@gmail.com');
    `);

    await trx.raw(`
      INSERT INTO "main"."notes" ("id", "user_id", "title", "content") VALUES (1, 1, 'A sticky menu, and a simple text container', 'Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus');
    `);

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

router.use('/', knexMiddleware, require('./profile'));
router.use('/', knexMiddleware, require('./notes'));

module.exports = router;
