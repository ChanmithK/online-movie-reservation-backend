const express = require("express");
const {
  TicketBooking,
  getBookings,
  DeleteBooking,
} = require("../controllers/booking-controller");
const router = express.Router();

router.post("/user/booking", TicketBooking);
router.get("/admin/allBookings", getBookings);
router.delete("/user/booking/delete/:bookingId", DeleteBooking);

module.exports = router;
