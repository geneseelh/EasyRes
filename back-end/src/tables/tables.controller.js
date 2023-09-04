const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

//MIDDLEWARE
async function validateData(request, response, next) {
  if (!request.body.data) {
      return next({ status: 400, message: "Body must include a data object" })
  }

  next();
}

async function validatePostBody(request, response, next) {
  if (!request.body.data.table_name) {
      return next({ status: 400, message: "'table_name' field cannot be empty" })
  }

  if (request.body.data.table_name.length < 2) {
      return next({ status: 400, message: "'table_name' field must be at least 2 characters", })
  }

  if (!request.body.data.capacity || request.body.data.capacity === "") {
      return next({ status: 400, message: "'capacity' field cannot be empty" })
  }

  if (typeof request.body.data.capacity !== "number") {
      return next({ status: 400, message: "'capacity' must be a number" })
  }

  if (request.body.data.capacity < 1) {
      return next({ status: 400, message: "'capacity' field must be at least 1" })
  }
  next()
}

async function validatePutBody(request, response, next) {
  if (request.body.data.table_id === "occupied") {
      return next({ status: 400, message: "'table_id' is occupied" })
  }
  next()
}

async function validateReservationId(request, response, next) {
  const { reservation_id } = request.body.data;

  if (!reservation_id) {
      return next({ status: 400, message: `reservation_id field must be included in the body`, })
  }

  const reservation = await service.readReservation(Number(reservation_id))

  if (!reservation) {
      return next({ status: 404, message: `reservation_id ${reservation_id} does not exist`, })
  }

  response.locals.reservation = reservation;
  next()
}

async function validateTableId(request, response, next) {
  const { table_id } = request.params;
  const table = await service.read(table_id);

  if (!table) {
      return next({ status: 404, message: `table_id ${table_id} does not exist`, })
  }
  response.locals.table = table;
  next();
}

async function validateSeatedTable(request, response, next) {
  if (response.locals.table.status !== "occupied") {
      return next({ status: 400, message: "This table is not occupied" })
  }

  next();
}

async function validateSeat(request, response, next) {
  if (response.locals.table.status === "occupied") {
      return next({ status: 400, message: "The table selected is currently occupied" })
  }

  if (response.locals.reservation.status === "seated") {
      return next({ status: 400, message: "The reservation selected is already seated" })
  }

  if (response.locals.table.capacity < response.locals.reservation.people) {
      return next({ status: 400, message: `The table selected does not have enough capacity to seat ${response.locals.reservation.people} people` })
  }

  next();
}

async function create(request, response) {
  if (request.body.data.reservation_id) {
      request.body.data.status = "occupied";
      await service.updateReservation(request.body.data.reservation_id, "seated");
  } else {
      request.body.data.status = "free";
  }

  const reservation = await service.create(request.body.data);
  response.status(201).json({ data: reservation[0] });
}

async function list(request, response) {
  const reservation = await service.list();
  response.json({ data: reservation });
}

async function update(request, response) {
  await service.occupy(
      response.locals.table.table_id,
      response.locals.reservation.reservation_id
  );
  await service.updateReservation(
      response.locals.reservation.reservation_id,
      "seated"
  );

  response.status(200).json({ data: { status: "seated" } });
}

async function destroy(request, response) {
  await service.updateReservation(
      response.locals.table.reservation_id,
      "finished"
  );
  await service.free(response.locals.table.table_id);
  response.status(200).json({ data: { status: "finished" } })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
      asyncErrorBoundary(validateData),
      asyncErrorBoundary(validatePostBody),
      asyncErrorBoundary(create),
  ],
  update: [
      asyncErrorBoundary(validateData),
      asyncErrorBoundary(validateTableId),
      asyncErrorBoundary(validateReservationId),
      asyncErrorBoundary(validateSeat),
      asyncErrorBoundary(validatePutBody),
      asyncErrorBoundary(update),
  ],
  destroy: [
      asyncErrorBoundary(validateTableId),
      asyncErrorBoundary(validateSeatedTable),
      asyncErrorBoundary(destroy),
  ],
}
// function quantityValidator(field) {
//   return function (req, _res, next) {
//     const { data: { [field]: value } = {} } = req.body;
//     if (value < 1) {
//       return next({
//         status: 400,
//         message: `${field} must be at least 1`,
//       });
//     }
//     if (!Number.isInteger(value)) {
//       return next({
//         status: 400,
//         message: `${field} must be an integer`,
//       });
//     }
//     next();
//   };
// }

// function nameValidator(field) {
//   return function (req, _res, next) {
//     const { data: { [field]: value } = {} } = req.body;
//     if (!value) {
//       return next({
//         status: 400,
//         message: `${field} is missing`,
//       });
//     }
//     if (value.length < 2) {
//       return next({
//         status: 400,
//         message: `${field} must be at least 2 characters`,
//       });
//     }
//     next();
//   };
// }

// async function capacityValidator(req, res, next) {
//   if (!req.body.data) {
//     return next({
//       status: 400,
//       message: "data is missing",
//     });
//   }

//   if (!req.body.data.reservation_id) {
//     return next({
//       status: 400,
//       message: "reservation_id is missing",
//     });
//   }

//   const reservation = await reservationsService.read(
//     req.body.data.reservation_id
//   );

//   if (!reservation) {
//     return next({
//       status: 404,
//       message: `reservation_id ${req.body.data.reservation_id} not found`,
//     });
//   }
//   const table = await service.read(req.params.table_id);
//   if (reservation.people > table.capacity) {
//     return next({
//       status: 400,
//       message: "Table capacity exceeded",
//     });
//   }
//   next();
// }

// async function isOccupied(req, res, next) {
//   const { table_id } = req.params;
//   const { reservation_id } = req.body.data;
//   const table = await service.read(table_id);

//   if (table.reservation_id) {
//     return next({
//       status: 400,
//       message: "Table is occupied",
//     });
//   }
//   next();
// }

// async function isNotOccupied(req, res, next) {
//   const { table_id } = req.params;
//   const table = await service.read(table_id);

//   if (!table.reservation_id) {
//     return next({
//       status: 400,
//       message: "Table is not occupied",
//     });
//   }
//   next();
// }

// async function tableExists(req, res, next) {
//   const { table_id } = req.params;
//   const table = await service.read(table_id);
//   if (!table) {
//     return next({
//       status: 404,
//       message: `Table ${table_id} cannot be found.`,
//     });
//   }
//   res.locals.table = table;
//   next();
// }

// async function reservationIsNotSeated(req, res, next) {
//   const { reservation_id } = req.body.data;
//   const reservation = await reservationsService.read(reservation_id);
//   if (reservation.status === "seated") {
//     return next({
//       status: 400,
//       message: "Reservation is already seated",
//     });
//   }
//   next();
// }

// async function list(req, res) {
//   const data = await service.list();
//   res.json({ data });
// }

// async function create(req, res) {
//   const response = await service.create(req.body.data);
//   res.status(201).json({ data: response });
// }

// async function update(req, res) {
//   const { table_id } = res.locals.table;
//   const { reservation_id } = req.body.data;
//   const response = await service.update(table_id, reservation_id);
//   const reservationResponse = await reservationsService.update(
//     reservation_id,
//     "seated"
//   );
//   res.status(200).json({ data: response });
// }

// async function destroy(req, res) {
//   const { table_id } = res.locals.table;
//   const { reservation_id } = res.locals.table;
//   const response = await service.destroy(table_id, reservation_id);
//   res.status(200).json({ data: response });
// }

// module.exports = {
//   list: [asyncErrorBoundary(list)],
//   create: [
//     nameValidator("table_name"),
//     quantityValidator("capacity"),
//     asyncErrorBoundary(create),
//   ],
//   update: [
//     asyncErrorBoundary(capacityValidator),
//     asyncErrorBoundary(tableExists),
//     asyncErrorBoundary(isOccupied),
//     asyncErrorBoundary(reservationIsNotSeated),
//     asyncErrorBoundary(update),
//   ],
//   delete: [
//     asyncErrorBoundary(tableExists),
//     asyncErrorBoundary(isNotOccupied),
//     asyncErrorBoundary(destroy),
//   ],
// };
