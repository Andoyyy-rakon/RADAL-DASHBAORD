const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema(
  {
    type: { type: Number, required: true },
    handheld_id: { type: Number, required: true },
    tower_id: { type: Number, required: true },
    lat: Number,
    lon: Number,
    status: Number,
    status_str: String,
    msg_id: Number,
    response:Boolean,
  },
  { timestamps: true }
);

EventSchema.index({ handheld_id: 1, tower_id: 1 }, { unique: true });

module.exports = mongoose.model("Event", EventSchema);
