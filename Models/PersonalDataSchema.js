const mongoose = require("mongoose");
const Express = require("express");

const PersonData = new mongoose.Schema({
  UIN: String,

  username: String,

  timeStamp: {
    type: Date,
    default: Date.now,
  },

  name: String,

  date: String,

  gender: String,

  educationalQualification: String,

  phoneNumber: String,

  aadharNumber: String,

  Vulnerabilities: [String],

  oldAgePension: String,

  occupation: [String],

  isADailyWageWorker: String,

  incomePerDay: String,

  incomePerMonth: String,

  workTimings: String,

  maritalStatus: String,

  specialSkills: [String],

  frequentHealthAilments: [String],

  communicableDiseases: [String],

  nonCommunicableDiseases: [String],

  surgeriesUndergone: String,

  anganwadiServicesAware: String,

  anganwadiServicesUsed: String,

  anganwadiServicesUtilised: [String],

  phcServicesUtilised: String,

  privateHealthClinicFacilitiesUsed: [String],

  reasonsForVisitingPrivateHealthClinic: String,

  tobaccoBasedProductsUsage: [String],

  alcoholConsumption: String,

  businessStatus: String,

  arogyaSethuAppInstallationStatus: String,

  vizhithiruAppInstallationStatus: String,
});

module.exports = PersonData;
