/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

async function validateData(request, res, next) {
  if (!request.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }
  next();
}

async function validateBody(request, res, next) {
  const required = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  for (const field of required) {
    if (
      !request.body.data.hasOwnProperty(field) ||
      request.body.data[field] === ""
    ) {
      return next({ status: 400, message: `Field required: '${field}'` });
    }
  }

  if (
    Number.isNaN(
      Date.parse(
        `${request.body.data.reservation_date} ${request.body.data.reservation_time}`
      )
    )
  ) {
    return next({
      status: 400,
      message:
        "'reservation_date' or 'reservation_time' field is not in the correct format",
    });
  }

  if (typeof request.body.data.people !== "number") {
    return next({ status: 400, message: "Number required in 'people' field" });
  }

  if (request.body.data.people < 1) {
    return next({
      status: 400,
      message: "Must be at least 1 person in 'people' field",
    });
  }

  if (request.body.data.status && request.body.data.status !== "booked") {
    return next({
      status: 400,
      message: `'status' cannot be ${request.body.data.status}`,
    });
  }

  if (/^[0-9\-]+$/.test(request.body.data.mobile_number) === false) {
    return next({
      status: 400,
      message: "'mobile_number' field must be a number",
    });
  }

  next();
}

async function validateDate(request, response, next) {
  const reservationDate = new Date(
    `${request.body.data.reservation_date}T${request.body.data.reservation_time}:00.000`
  );

  const today = new Date();

  if (reservationDate.getDay() === 2) {
    return next({ status: 400, message: "Restaurant is closed on Tuesday" });
  }

  if (reservationDate < today) {
    return next({
      status: 400,
      message: "Reservation must be made for a future date and time",
    });
  }

  if (
    reservationDate.getHours() < 10 ||
    (reservationDate.getHours() === 10 && reservationDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "Restaurant is not open until 10:30AM",
    });
  }

  if (
    reservationDate.getHours() > 22 ||
    (reservationDate.getHours() === 22 && reservationDate.getMinutes() >= 30)
  ) {
    return next({ status: 400, message: "Restaurant is closed after 10:30PM" });
  }

  if (
    reservationDate.getHours() > 21 ||
    (reservationDate.getHours() === 21 && reservationDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message: "Reservation must be made at or before 9:30PM",
    });
  }

  next();
}

async function validateReservationId(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await service.read(Number(reservation_id));
  if (!reservation) {
    return next({ status: 404, message: `${reservation_id} does not exist` });
  }
  response.locals.reservation = reservation;
  next();
}

async function validateUpdateBody(request, response, next) {
  if (!request.body.data.status) {
    return next({ status: 400, message: "Body must include a status" });
  }

  if (
    request.body.data.status !== "booked" &&
    request.body.data.status !== "seated" &&
    request.body.data.status !== "finished" &&
    request.body.data.status !== "cancelled"
  ) {
    return next({
      status: 400,
      message: `Status field cannot be ${request.body.data.status}`,
    });
  }

  if (response.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: `Unable to update a finished reservation`,
    });
  }

  next();
}

async function list(request, response) {
  const date = request.query.date;
  const mobile = request.query.mobile_number;
  const reservations = await service.list(date, mobile);
  const reservation = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
  response.json({ data: reservation });
}

async function create(request, response) {
  request.body.data.status = "booked";
  const reservation = await service.create(request.body.data);
  response.status(201).json({ data: reservation[0] });
}

async function read(request, response) {
  response.status(200).json({ data: response.locals.reservation });
}

async function update(request, response) {
  await service.update(
    response.locals.reservation.reservation_id,
    request.body.data.status
  );
  response.status(200).json({ data: { status: request.body.data.status } });
}

async function edit(request, response) {
  const reservation = await service.edit(
    response.locals.reservation.reservation_id,
    request.body.data
  );
  response.status(200).json({ data: reservation[0] });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(validateReservationId), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateReservationId),
    asyncErrorBoundary(validateUpdateBody),
    asyncErrorBoundary(update),
  ],
  edit: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateReservationId),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(edit),
  ],
};
