const router = require("express").Router();
const controller = require("./tables.controller");
const seatRouter = require("../seats/seats.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.use("/:table_id/seat", seatRouter);
router.route("/:table_id/seat")
  .put(controller.seat)
  .delete(controller.finish);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
