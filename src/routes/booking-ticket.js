const express = require("express");
const { TicketBooking } = require("../controllers/booking-controller");
const router = express.Router();

router.post("/user/booking", TicketBooking);

module.exports = router;
