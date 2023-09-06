const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((data) => data[0]);
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function update(reservation_id, status) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*");
  return updated[0];
}

async function edit(reservation_id, reservation) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(reservation, "*")
    .returning("*");
  return updated[0];
}

async function list() {
  return knex("reservations")
    .select("*")
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_date");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");
}

function finish(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: "finished" });
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  update,
  edit,
  list,
  listByDate,
  finish,
  search,
};
