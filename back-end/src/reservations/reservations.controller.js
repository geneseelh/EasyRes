/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

function validator(field) {
  return function (req, _res, next) {
    //add validation for date and time
    // add validation for mobile number
    // add validation for number of people
    const { data: { [field]: value } = {} } = req.body;
    if (!value) {
      return next({
        status: 400,
        message: `${field} is missing`,
      });
    }

    next();
  };
}

function phoneNumberValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (value.length < 12 || value.length > 12) {
      return next({
        status: 400,
        message: `${field} must be a valid phone number`,
      });
    }
    next();
  };
}

function dateValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    const date = new Date(value);
    const today = new Date();
    //us-02 date validation
    if (date.getUTCDay() === 2) {
      next({
        message: "Reservation is closed on Tuesdays.",
        status: 400,
      });
    }
    if (date < today) {
      next({
        message: "Reservation must be in the future.",
        status: 400,
      });
    }
    if (isNaN(date)) {
      return next({
        status: 400,
        message: `${field} must be a valid date`,
      });
    }
    next();
  };
}

function timeValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    let submittedTime = value.replace(":", "");
    const timeCheck = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timeCheck.test(value)) {
      return next({
        status: 400,
        message: `${field} must be a valid time`,
      });
    }
    //us-03 time validation
    if (submittedTime < 1030 || submittedTime > 2130) {
      next({
        status: 400,
        message: "Please select a time between 10:30 AM and 21:30",
      });
    }
    next();
  };
}

function peopleValidator(field) {
  return function (req, _res, next) {
    console.log({ field });
    const { data: { [field]: value } = {} } = req.body;
    console.log({ value });
    if (typeof value !== "number") {
      console.log({ value });
      return next({
        status: 400,
        message: `${field} must be a number`,
      });
    }
    if (value < 1) {
      return next({
        status: 400,
        message: `${field} must be at least 1`,
      });
    }
    next();
  };
}

function createStatusValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (value === "seated" || value === "finished") {
      return next({
        status: 400,
        message: `${field} cannot be seated or finished`,
      });
    }
    next();
  };
}

function updateStatusValidator(field) {
  return function (req, _res, next) {
    const { data: { [field]: value } = {} } = req.body;
    // console.log("update status validator");
    if (value === "unknown") {
      // console.log("unknown");
      return next({
        status: 400,
        message: `${field} cannot be ${value}`,
      });
    }
    next();
  };
}

function updateStatusIsNotFinished(req, res, next) {
  const { reservation: { status } = {} } = res.locals;
  if (status === "finished") {
    return next({
      status: 400,
      message: "a finished reservation cannot be updated",
    });
  }
  next();
}

async function list(req, res) {
  // const { date } = req.query;
  // const data = await service.list(date);
  const { date, mobile_number } = req.query;
  let data;
  if (date) {
    data = await service.list(date);
  } else if (mobile_number) {
    data = await service.search(mobile_number);
  }
  res.json({ data });
}
async function create(req, res) {
  const response = await service.create(req.body.data);
  res.status(201).json({
    data: response,
  });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.json({ data });
}

async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;
  const response = await service.update(reservation_id, status);
  // this is the response from the service function
  // i have sppecifically asked for the first item in the array
  // to accomodate the tests
  res.status(200).json({ data: response[0] });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    ...[
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people",
    ].map(validator),
    phoneNumberValidator("mobile_number"),
    dateValidator("reservation_date"),
    timeValidator("reservation_time"),
    peopleValidator("people"),
    createStatusValidator("status"),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    updateStatusIsNotFinished,
    updateStatusValidator("status"),
    asyncErrorBoundary(update),
  ],
};
