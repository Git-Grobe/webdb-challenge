exports.up = async function(knex) {
    await knex.schema.createTable('project', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable();
      tbl.string('description').notNullable();
      tbl.boolean('completed').defaultTo(false);
    })
  
    await knex.schema.createTable('actions', tbl => {
      tbl.increments('id');
      tbl.string('description').notNullable();
      tbl.string('notes').notNullable();
      tbl.boolean('completed').defaultTo(false);
      tbl
          .integer('project_id')
          .references('id')
          .inTable('project')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
          .notNullable();
    })
  };
  
  
  // MUST be done in reverse order or creation
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('actions')    // deletes table
    await knex.schema.dropTableIfExists('project')
  };
  