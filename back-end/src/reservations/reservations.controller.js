const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  // const date = req.query.date || new Date().toISOString().slice(0, 10);

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

async function create(req, res, next) {
  try {
    if (!req.body.data) {
      return res.status(400).json({
        error: "Missing data in request body",
      });
    } else {
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
      const { data = {} } = req.body;
      if (isNaN(Date.parse(data["reservation_date"]))) {
        return res.status(400).json({
          error: "Missing or invalid reservation_date",
        });
      }
    }
    const data = await reservationsService.create(req.body.data);
    res.status(201).json({
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
