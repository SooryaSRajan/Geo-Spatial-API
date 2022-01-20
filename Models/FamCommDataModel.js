const mongoose = require("mongoose");

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

const FamilyindData = new mongoose.Schema({
  familyMemberData: [personalDataSchema],
  FamilyUIN: String,
  locationTopLeft: [Number],
  locationTopRight: [Number],
  locationBottomLeft: [Number],
  locationBottomRight: [Number],
  headOfFamily: String,
  availabilityOfDrinkingWater: String,
  drinkingWaterSource: [String],
  areToiletsAvailableInHouse: String,
  noToiletsWhy: [String],
  alternativeForHouseholdToilet: String,
  statusOfEnvironmentalSanitation: String,
  availabilityOfWaterInToilets: String,
  numberOfTwoWheelers: String,
  numberOfThreeWheelers: String,
  numberOfFourWheelers: String,
  brandsOfTwoThreeWheelers: [String],
  brandsOfFourWheelers: [String],
  locallyAvailableFoodsConsumed: [String],
  doYouOwnCattle: String,
  incomeFromCattle: String,
  doYouOwnFarmLand: String,
  doYouPreserveSeeds: String,
  cropsCultivated: [String],
  typesOfSeedsPreserved: [String],
  treesOwnedIfAny: [String],
  isKitchenGardenAvailable: String,
  cropsInKitchenGarden: [String],
  address: String,
  villageCode: String,
});

const FamilyDataModel = mongoose.model("FamilyData", FamilyindData);

module.exports = FamilyDataModel;
