exports.up = function(knex) {
    return knex.schema.createTable('incidents',(Table)=>{
        //chavei auto incremental
        Table.increments().primary();
        //campos
        Table.string('title').notNullable();
        Table.string('description').notNullable();
        Table.decimal('value').notNullable();
        //chave estrangeira da tabela ong
        Table.string('ong_id').notNullable();
        //relacionamento
        Table.foreign('ong_id').references('id').inTable('ongs');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  }; 
