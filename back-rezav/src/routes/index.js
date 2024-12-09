const express = require("express");

const {
    PostReservation,GetReservation,UpdateReservationStatus} = require("../controllers/reservationController");
const { GetItems } = require("../controllers/itemController");

const router = express.Router();

router.get("/items", GetItems);
router.post("/reservation", PostReservation);
router.get("/reservation", GetReservation);
router.patch("/reservation/requestStatus/:id", UpdateReservationStatus);

module.exports = router;