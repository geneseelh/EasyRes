const router = require("express").Router();
const controller = require("./tables.controller");
const seatRouter = require("../seats/seats.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.use("/:table_id/seat", seatRouter);

module.exports = router;
