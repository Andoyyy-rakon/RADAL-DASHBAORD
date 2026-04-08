const express = require("express");
const { login, refresh } = require("../controllers/authcontrollers");

const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);

router.post("/logout", (req, res) => {
  // Clear the cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // true if using HTTPS
    sameSite: "strict"
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;