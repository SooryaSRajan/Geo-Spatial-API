const mongoose = require("mongoose");
const occupationDataSchema = require("./occupationDataSchema");

const personalDataSchema = require("./personalDataSchema");

const FamilyindData = new mongoose.Schema({
  volunteerUserId: String,
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
