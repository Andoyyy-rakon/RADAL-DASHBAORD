const express = require("express");
const router = express.Router();
const { sendResponsePacket } = require("../services/serialService");

router.post("/send-response", (req, res) => {

  const { handheld_id, msg_id, response_code } = req.body;
console.log("Received response:", handheld_id, msg_id, response_code);
  const ok = sendResponsePacket(
    handheld_id,
    msg_id,
    response_code
  );

  if (!ok) {
    return res.status(500).json({ error: "Serial not connected" });
  }

  res.json({ success: true });

});

module.exports = router;


