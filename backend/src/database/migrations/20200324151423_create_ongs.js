
exports.up = function(knex) {
  return knex.schema.createTable('ongs',(Table)=>{
      Table.string('id').primary();
      Table.string('name').notNullable();
      Table.string('email').notNullable();
      Table.string('whatsapp').notNullable();
      Table.string('city').notNullable();
      Table.string('state',2).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
