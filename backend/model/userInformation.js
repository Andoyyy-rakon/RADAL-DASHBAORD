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
}, {
  timestamps: true
});

module.exports = mongoose.model("userInfo",userInfoModel);
