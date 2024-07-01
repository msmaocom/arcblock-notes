/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, username: "user01", age: 10, summary: 'summary 01', phone: '12345678901', email: 'user01@gmail.com' }
  ]);
};
