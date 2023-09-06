const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(Number(table_id));
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({ status: 404, message: `Table ${table_id} not found` });
  }
}

function isOccupied(req, res, next) {
  if (res.locals.table.reservation_id) return next();
  next({ status: 400, message: "Table is not occupied" });
}

function bodyHasData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({ status: 400, message: "body" });
  }
  next();
}

function hasCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (!capacity) {
    next({ status: 400, message: "capacity" });
  } else {
    next();
  }
}

function isValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity === 0 || typeof capacity !== "number") {
    return next({ status: 400, message: "capacity" });
  } 
  next();
}

function bodyHasReservationId(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({ status: 400, message: "reservation_id" });
  }
  res.locals.reservation_id = reservation_id;
  next();
}

function isValidName(req, res, next) {
  const { table_name } = req.body.data;
  if (!table_name || !table_name.length || table_name.length === 1) {
    return next({ status: 400, message: "table_name" });
  }
  next();
}

function isTableLargeEnough(req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if (capacity >= people) return next();
  next({ status: 400, message: "capacity" });
}

function isAvailable(req, res, next) {
  if (!res.locals.table.reservation_id) return next();
  next({ status: 400, message: "occupied" });
}

async function reservationIdExists(req, res, next) {
  const reservation = await reservationsService.read(res.locals.reservation_id);
  if (!reservation) {
    return next({ status: 404, message: `${res.locals.reservation_id}` });
  } else {
    res.locals.reservation = reservation;
    next();
  }
}

function isReservationSeated(req, res, next) {
  if (res.locals.reservation.status === "seated")
    return next({
      status: 400,
      message: "reservation is already seated",
    });
  next();
}

async function create(req, res, next) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function seat(req, res, next) {
  const data = await service.seat(
    res.locals.table.table_id,
    res.locals.reservation_id
  );
  res.json({ data });
}

async function finish(req, res, next) {
  const data = await service.finish(res.locals.table);
  res.json({ data });
}

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  create: [
    bodyHasData,
    hasCapacity,
    isValidName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  seat: [
    bodyHasData,
    bodyHasReservationId,
    asyncErrorBoundary(reservationIdExists),
    isReservationSeated,
    asyncErrorBoundary(tableExists),
    isTableLargeEnough,
    isAvailable,
    asyncErrorBoundary(seat),
  ],
  finish: [
    asyncErrorBoundary(tableExists),
    isOccupied,
    asyncErrorBoundary(finish),
  ],
  list: [asyncErrorBoundary(list)],
};
