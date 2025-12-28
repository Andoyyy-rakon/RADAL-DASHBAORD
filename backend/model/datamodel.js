const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema(
  {
    latency_ms:String,
    type: { type: Number, required: true },
    type_str:String,
    handheld_id: { type: Number, required: true },
    tower_id: { type: Number, required: true },
    lat: Number,
    lon: Number,
    status: Number,
    status_str: String,
    msg_id: Number,
    response_code:Number,
    response_bool:Boolean,
  },
  { timestamps: true }
);

EventSchema.index({ handheld_id: 1, tower_id: 1 }, { unique: true });

module.exports = mongoose.model("Event", EventSchema);
