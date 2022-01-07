const mongoose = require("mongoose");
const PersonalData = require("../Models/PersonalDataSchema");

const PersonalDataSchema = new mongoose.Schema({
  PersonalInfoCollection: [PersonalData],
});

const PersonalDataModel = mongoose.model(
  "PersonalInfoCollection",
  PersonalDataSchema
);

module.exports = PersonalDataModel;
