const service = require("./seats.service");
const reservationService = require("../reservations/reservations.service");
const tableService = require("../tables/tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasReservationId(req, res, next) {
  const table = req.body.data;
  if (!table) {
    return next({ status: 400, message: "Required data attribute." });
  }
  if (!table.reservation_id) {
    return next({ status: 400, message: "reservation_id is required." });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);
  if (!reservation) {
    return next({ status: 404, message: `${reservation_id} does not exist` });
  }
  res.locals.reservation = reservation;
  next();
}

async function isValidCapacity(req, res, next) {
  const { table_id } = req.params;
  const currentTable = await tableService.read(table_id);
  const reservation = res.locals.reservation;
  if (reservation.people > currentTable.capacity) {
    return next({
      status: 400,
      message: "Table does not have enough capacity for reservation.",
    });
  }

  if (currentTable.reservation_id) {
    return next({ status: 400, message: "Table occupied." });
  }

  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await tableService.read(Number(table_id));
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


function ifReservationSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    return next({ status: 400, message: "Reservation is already seated" });
  }
  next();
}


async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  await service.update(table_id, reservation_id);
  res.status(200).json({ data: reservation_id });
}

async function destroy(req, res, next) {
  const data = await service.finish(res.locals.table);
  res.json({ data });
}

module.exports = {
  update: [
    hasReservationId,
    asyncErrorBoundary(reservationExists),
    ifReservationSeated,
    asyncErrorBoundary(isValidCapacity),
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(tableExists),
    isOccupied,
    asyncErrorBoundary(destroy),
  ],
};
