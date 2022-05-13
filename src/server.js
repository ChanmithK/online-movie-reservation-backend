const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//environment variable
env.config();
//MongoDB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@online-movie-reservatio.nowze.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected !!");
  });
app.listen(process.env.PORT, () => {
  console.log(`Server in running on port ${process.env.PORT}`);
});

//--------------------------------------------------------------------------

//routes
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/booking-ticket");
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/Production-Team/auth");
const movieRoutes = require("./routes/Production-Team/movie");

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", ticketRoutes);
app.use("/api", cartRoutes);
app.use("/api", adminRoutes);
app.use("/api", movieRoutes);
