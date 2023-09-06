/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

// MIDDLEWARE

// array of all the required valid fields for a reservation

const _VALID_RESERVATION_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

// validate that the reservation_time is in the correct format

function validateTime(string) {
  const [hour, minute] = string.split(":");

  if (hour.length > 2 || minute.length > 2) {
    return false;
  }
  if (hour < 1 || hour > 23) {
    return false;
  }
  if (minute < 0 || minute > 59) {
    return false;
  }
  return true;
}

// validate that a reservation has all the required fields

function isValidReservation(req, res, next) {
  const reservation = req.body.data;

  if (!reservation) {
    return next({ status: 400, message: `Required data attribute.` });
  }

  _VALID_RESERVATION_FIELDS.forEach((field) => {
    if (!reservation[field]) {
      return next({ status: 400, message: `${field} field required` });
    }

    if (field === "people" && typeof reservation[field] !== "number") {
      return next({
        status: 400,
        message: "Number of people must be a numeric value.",
      });
    }

    if (field === "reservation_date" && !Date.parse(reservation[field])) {
      return next({ status: 400, message: `${field} is not a valid date.` });
    }

    if (field === "reservation_time") {
      if (!validateTime(reservation[field])) {
        return next({ status: 400, message: `${field} is not a valid time.` });
      }
    }
  });

  next();
}

// validate the date is not on a Tuesday

function isNotTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  console.log("date", reservation_date);
  const [year, month, day] = reservation_date.split("-");
  const date = new Date(`${month}-${day}-${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    // console.log("tuesday validation failed");
    return next({ status: 400, message: "Location is closed on Tuesdays." });
  }
  next();
}

// validate that the reservations are on a future date

function isInFuture(req, res, next) {
  const date = res.locals.date;
  const today = new Date();
  if (date < today) {
    // console.log("tuesday validation failed");
    return next({ status: 400, message: "Must be a future date." });
  }
  next();
}

// validate that the reservation exists

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation_id ${reservation_id} does not exist.`,
    });
  }
  res.locals.reservation = reservation;
  next();
};

// validate that the reservation time is being made within business hours

function isWithinOpenHours(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");

  if (hour < 10 || hour > 20) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours.",
    });
  }

  if ((hour === 10 && minute < 30) || (hour === 20 && minute > 30)) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours",
    });
  }

  next();
}

// validate if the reservation status is known

function isValidStatus(req, res, next) {
  const VALID_STATUSES = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;
  if (!VALID_STATUSES.includes(status)) {
    return next({ status: 400, message: "Status unknown." });
  }
  next();
}

// validate if the reservation is showing a "booked" status

function hasBookedStatus(req, res, next) {
  const { status } = res.locals.reservation
    ? res.locals.reservation : req.body.data;
  if (status === "seated" || status === "finished" || status === "cancelled") {
    return next({
      status: 400,
      message: `New reservation can not have ${status} status.`,
    });
  }
  next();
}

// validate if the reservation is "finished"

function isFinishedReservation(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "Reservation is already finished.",
    });
  }
  next();
}

// CRUD FUNCTIONS

// list all the reservations

async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservations;
  if (mobile_number) {
    reservations = await service.search(mobile_number);
  } else {
    reservations = date ? await service.listByDate(date) : await service.list();
  }
  res.json({ data: reservations });
}

// create a new reservation

async function create(req, res) {
  const reservation = req.body.data;
  const createdReservation = await service.create(reservation);
  // reservation.reservation_id = reservation_id;
  res.status(201).json({ data: createdReservation });
}

// read a reservation

async function read(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}

// update a reservation

async function update(req, res) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const reservation = await service.update(reservation_id, status);
  res.json({ data: reservation });
}

// edit a reservation

async function edit(req, res) {
  const { reservation_id } = req.params;
  const reservation = req.body.data;
  const data = await service.edit(reservation_id, reservation);
  reservation.reservation_id = data.reservation_id;
  res.json({ data: reservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(isValidReservation),
    isNotTuesday,
    isInFuture,
    isWithinOpenHours,
    hasBookedStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    isValidStatus,
    isFinishedReservation,
    asyncErrorBoundary(update),
  ],
  edit: [
    isValidReservation,
    isNotTuesday,
    isInFuture,
    isWithinOpenHours,
    asyncErrorBoundary(reservationExists),
    hasBookedStatus,
    asyncErrorBoundary(edit),
  ],
};
