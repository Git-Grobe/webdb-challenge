exports.seed = async function(knex) {
  await knex('project').insert([
        {id: 1, name: '1', description: '1'},
        {id: 2, name: '2',  description: '2'},
        {id: 4, name: '3', description: '3'}
      ]);
};
