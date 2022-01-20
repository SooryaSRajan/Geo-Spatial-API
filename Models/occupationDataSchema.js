const mongoose = require("mongoose");

const occupationDataSchema = new mongoose.Schema({
  category: String,
  occupation: [String],
});

module.exports = occupationDataSchema;
