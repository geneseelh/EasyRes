const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  try {
    const reservations = await reservationsService.listReservationsByDate(
      req.query.date
    );
    res.json({
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
}

function isDate(dateToCheck) {
  const time = new Date(dateToCheck).getTime();
  return !isNaN(time);
}

function isTime(timeToCheck) {
  // split at colon
  // put both strings into variables
  const [hoursStr, minutesStr] = timeToCheck.split(":");
  // turn each one into a number
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  // check that hours & minutes are actually numbers
  if (isNaN(hours) || isNaN(minutes)) {
    return false;
  }
  // check if hours <= 24 && > 0
  if (hours > 24 || hours < 1) {
    return false;
  }
  // check if mins >= 0 && <= 59
  if (minutes < 1 || minutes > 59) {
    return false;
  }
  return true;
}

async function create(req, res, next) {
  try {
    if (!req.body.data) {
      return res.status(400).json({
        error: "Missing data in request body",
      });
    }
    if (!req.body.data.first_name) {
      return res.status(400).json({
        error: "Missing first_name",
      });
    }
    if (!req.body.data.last_name) {
      return res.status(400).json({
        error: "Missing last_name",
      });
    }
    if (!req.body.data.mobile_number) {
      return res.status(400).json({
        error: "Missing mobile_number",
      });
    }
    if (
      !req.body.data.reservation_date ||
      !isDate(req.body.data.reservation_date)
    ) {
      return res.status(400).json({
        error: "Missing or invalid reservation_date",
      });
    }
    if (
      !req.body.data.reservation_time ||
      !isTime(req.body.data.reservation_time)
    ) {
      return res.status(400).json({
        error: "Missing or invalid reservation_time",
      });
    }
    if (!req.body.data.people || !isNaN(req.body.data.people)) {
      return res.status(400).json({
        error: "Missing or invalid people",
      });
    }
    const data = await reservationsService.create(req.body.data);
    return res.status(201).json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
