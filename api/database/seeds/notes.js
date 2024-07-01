/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notes').del()
  await knex('notes').insert([
    { id: 1, user_id: 1, title: "title 01", content: 'content 01' }
  ]);
};
