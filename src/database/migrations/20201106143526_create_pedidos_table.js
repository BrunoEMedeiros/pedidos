
exports.up = function(knex) {
    return knex.schema.createTable('pedidos', table => {
        table.increments('id').primary();
        table.string('cliente').notNullable();
        table.string('forma_pagamento').notNullable();
        table.string('endereco').notNullable();
        table.string('valor').notNullable();
      })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('pedidos');
};
