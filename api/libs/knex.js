const Knex = require('knex');
const path = require('path');

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../database/notes.sqlite3')
  },
  pool: {
    min: 1,
    max: 10
  },
  useNullAsDefault: true,
})

const knexMiddleware = (req, res, next) => {
  req.knex = knex
  req.trxProvider = knex.transactionProvider();
  next();
};

module.exports = {
  knex,
  knexMiddleware
}
