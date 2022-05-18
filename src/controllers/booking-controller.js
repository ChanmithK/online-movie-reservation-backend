const Booking = require("../models/booking");

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
