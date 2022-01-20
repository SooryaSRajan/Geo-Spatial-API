const mongoose = require("mongoose");
const express = require("express");

const occupationDataSchema = require("./occupationDataSchema");

const personalDataSchema = new mongoose.Schema({
  UIN: String,
  name: String,
  dateOfBirth: String,
  gender: String,
  phoneNumber: String,
  educationalQualification: String,
  aadhaarNumber: String,
  Vulnerabilities: [String],
  isADailyWageWorker: String,
  occupationData: [occupationDataSchema],
  employed: String,
  income: String,
  incomeType: String,
  oldAgePension: String,
  businessStatus: String,
  maritalStatus: String,
  noOfDaysWorking: String,
  specialSkills: [String],
  workTimings: [String],
  surgeriesUndergone: String,
  anganwadiServicesAware: String,
  anganwadiServicesUsed: String,
  anganwadiServicesUtilised: [String],
  phcServicesUtilised: String,
  privateHealthClinicFacilitiesUsed: [String],
  reasonsForVisitingPrivateHealthClinic: [String],
  communicableDiseases: [String],
  frequentHealthAilments: [String],
  nonCommunicableDiseases: [String],
  tobaccoBasedProductsUsage: String,
  tobaccoProductsUsed: [String],
  alcoholConsumption: String,
  arogyaSethuAppInstallationStatus: String,
  vizhithiruAppInstallationStatus: String,
});

module.exports = { personalDataSchema };
