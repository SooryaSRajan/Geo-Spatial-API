const mongoose = require("mongoose");

const VillageSchema = new mongoose.Schema({
  villageName: {
    type: String,
    required: true,
  },
  villageCode: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
    unique: true,
  },
  UIN: {
    type: String,
  },
});

const Village = mongoose.model("Village-info", VillageSchema);

module.exports = Village;
