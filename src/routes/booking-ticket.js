const express = require("express");
const {
  TicketBooking,
  getBookings,
  DeleteBooking,
  getBookingDetailsById,
} = require("../controllers/booking-controller");
const router = express.Router();

router.post("/user/booking", TicketBooking);
router.get("/admin/allBookings", getBookings);
router.delete("/user/booking/delete/:bookingId", DeleteBooking);
router.get("/user/booking/:bookingId", getBookingDetailsById);

module.exports = router;
