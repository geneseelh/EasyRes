const knex = require("../db/connection");

// create a new reservation

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
}

// read a reservation by id

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

// update a reservation's status by id

async function update(reservation_id, status) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*");
  return updated[0];
}

// edit a reservation by id

async function edit(reservation_id, reservation) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(reservation, "*")
    .returning("*");
  return updated[0];
}

// list all reservations

async function list() {
  return knex("reservations")
    .select("*")
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_date");
}

// list reservations by date

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");
}

// change a reservation's status to finished

function finish(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: "finished" });
}

// search for a reservation by mobile number

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
