const mongoose = require("mongoose");

const FamilyDataSchema = new mongoose.Schema({
  availabilityOfDrinkingWater: String,

  drinkingWaterSource: String,

  areToiletsAvailableInHouse: String,

  availabilityOfWaterInToilets: String,

  alternativeForHouseholdToilet: String,

  statusOfEnvironmentalSanitation: String,

  numberOfTwoWheelers: String,

  brandsOfTwoWheelers: String,

  numberOfThreeWheelers: String,

  brandsOfThreeWheelers: String,

  numberOfFourWheelers: String,

  brandsOfFourWheelers: String,

  doYouOwnCattle: String,

  incomeFromCattle: String,

  doYouOwnFarmLand: String,

  cropsCultivated: String,

  doYouPreserveSeeds: String,

  typesOfSeedsPreserved: String,

  locallyAvailableFoodsConsumed: String,

  treesOwnedIfAny: String,

  isKitchenGardenAvailable: String,

  cropsInKitchenGarden: String,

  address: String,

  villageCode: String,
});

module.exports = FamilyDataSchema;
