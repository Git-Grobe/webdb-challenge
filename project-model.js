const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

module.exports = {

    getProjectById

};

async function getProjectById(id) {
    const projects =  await db.select()
        .from('project as p')
        .where('p.id', Number(id));
    const actions = await db.select('a.id', 'a.description', 'a.notes', 'a.completed')
        .from('project as p')
        .join('actions as a', 'p.id', 'a.project_id')
        .where('p.id', Number(id));
    if(projects) {
        const result = {...projects[0], actions: actions};
        return result;
    } else {
        return projects[0];
    }
}