const Theater = require("../../models/theater");

//Admin Add theater controller
exports.AddTheater = (req, res) => {
  const { theaterName } = req.body;

  const theater = new Theater({
    theaterName,
  });

  theater.save((error, theater) => {
    if (error) return res.status(400).json({ error });
    if (theater) {
      res.status(201).json({ theater });
    }
  });
};

//Admin Get all theaters controller
exports.GetAllTheaters = (req, res) => {
  Theater.find({}).exec((error, theaters) => {
    if (error) return res.status(400).json({ error });

    if (theaters) {
      res.status(200).json({
        theaters,
      });
    }
  });
};
