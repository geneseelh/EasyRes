const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

//MIDDLEWARE

const VALID_TABLE_FIELDS = ["table_name", "capacity"];

// validate that a table has all the required fields

function isValidTable(req, res, next) {
  const table = req.body.data;
  if (!table) {
    return next({ status: 400, message: "Required data attribute" });
  }

  VALID_TABLE_FIELDS.forEach((field) => {
    if (!table[field]) {
      return next({ status: 400, message: `Required property ${field}.` });
    }
  });

  if (typeof table["capacity"] !== "number") {
    return next({
      status: 400,
      message: "The capacity needs to be a number exceeding 0.",
    });
  }

  if (table["table_name"].length < 2) {
    return next({
      status: 400,
      message: "The table_name should consist of a minimum of two characters.",
    });
  }
  next();
}

// CRUD FUNCTIONS

// create a new table

async function create(req, res, next) {
  const table = req.body.data;
  const newTable = await service.create(table);
  table.reservation_id = newTable.reservation_id;
  table.table_id = newTable.table_id;
  res.status(201).json({ data: table });
}

// list all tables

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [isValidTable, asyncErrorBoundary(create)],
  isValidTable,
};
