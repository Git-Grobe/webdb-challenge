exports.seed = async function(knex) {
  await knex('actions').insert([
    {id: 1, description: '1', notes: '1', project_id: 1},
    {id: 2, description: '2', notes: '1', project_id: 1},
    {id: 3, description: '3', notes: '2', project_id: 2},
    {id: 4, description: '4', notes: '2', project_id: 2},
    {id: 5, description: '5', notes: '2', project_id: 2},
    {id: 6, description: '6', notes: '3', project_id: 3},
    {id: 7, description: '7', notes: '4', project_id: 4}
  ]);
};
