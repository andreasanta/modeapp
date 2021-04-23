
exports.up = function(knex) {
    return knex.schema
    .createTable('transactions', function (table) {
        
        table.increments('id');
        table.integer('src_user_id').nullable()
        table.integer('dst_user_id').notNullable()
        table.decimal('amount').notNullable().defaultsTo(0)
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('src_user_id').references('users.id')
        table.foreign('dst_user_id').references('users.id')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
