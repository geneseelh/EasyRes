exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.string("mobile_number").notNull();
    table.string("reservation_date").notNull();
    table.string("reservation_time").notNull();
    table.integer("people").notNull().unsigned();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reservations");
};
