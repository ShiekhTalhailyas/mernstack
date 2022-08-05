const express = require("express");
const router = express.Router();
const {
  userLogin,
  registerUser,
  getMe,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/login", userLogin);
router.get("/me", protect, getMe);

module.exports = router;
