const Booking = require("../models/booking");

exports.TicketBooking = (req, res) => {
  const { movieId, noOfSeats, date, time, qrCode } = req.body;

  const booking = new Booking({
    movieId,
    noOfSeats,
    date,
    time,
    qrCode,
  });

  booking.save((error, booking) => {
    if (error) return res.status(400).json({ error });
    if (booking) {
      res.status(201).json({ booking });
    }
  });
};
