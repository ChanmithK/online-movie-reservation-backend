const Booking = require("../models/booking");

//User Ticket Booking Controller
exports.TicketBooking = (req, res) => {
  const { movieId, noOfSeats, date, time, qrCode, theater } = req.body;

  const booking = new Booking({
    movieId,
    noOfSeats,
    date,
    time,
    qrCode,
    theater,
  });

  booking.save((error, booking) => {
    if (error) return res.status(400).json({ error });
    if (booking) {
      res.status(201).json({ booking });
    }
  });
};

//User get All Booking Controller
exports.getBookings = (req, res) => {
  Booking.find({}).exec((error, bookings) => {
    if (error) return res.status(400).json({ error });

    if (bookings) {
      res.status(200).json({
        bookings,
      });
    }
  });
};

//User Delete Booking Controller
exports.DeleteBooking = (req, res) => {
  const { bookingId } = req.params;
  console.log(req.params);
  Booking.findOneAndDelete({ _id: bookingId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//User get Relevant Booking By Id Controller
exports.getBookingDetailsById = (req, res) => {
  const { bookingId } = req.params;
  if (bookingId) {
    Booking.findOne({ _id: bookingId }).exec((error, booking) => {
      if (error) return res.status(400).json({ error });
      if (booking) {
        res.status(201).json({ booking });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
