const mongoose = require("mongoose");

const userInfoModel = new mongoose.Schema({
  device_id: {
    type: Number,
    required: true,
    unique: true 
  },
  family_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  warning_message: {
    type: String,
    required: true,
    default: "Immediate rescue needed! Household is in danger."
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("userInfo",userInfoModel);
