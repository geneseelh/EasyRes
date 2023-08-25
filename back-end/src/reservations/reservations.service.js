const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*").orderBy("reservation_time", "asc");
}

function listReservationsByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservation_time", "asc");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

module.exports = {
  create,
  listReservationsByDate,
  list,
};
