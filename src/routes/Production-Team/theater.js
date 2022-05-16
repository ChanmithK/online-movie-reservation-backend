const express = require("express");
const router = express.Router();
const {
  AddTheater,
  GetAllTheaters,
} = require("../../controllers/Production-Team/theater-controller");

router.post("/admin/theater/add", AddTheater);
router.get("/admin/getTheaters", GetAllTheaters);

module.exports = router;
