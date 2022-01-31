const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const router = Express.Router();
const VillageModel = require("../Models/villageInfo");
const FamilyModel = require("../Models/FamCommDataModel");
const {User} = require("../Models/users");

// const _ = require("lodash");

function GetFamilyNumberFromUIN(UIN) {
  // IRNCE(5) + VILLAGECODE (3) + F + FAMILYNUMBER (3) + I + INDIVIDUALNUMBER (3)
  return UIN.substring(9, 12);
}

function FormatNumberasThreeDigit(number) {
  if (number < 100 && number >= 10) {
    number = "0" + number;
  } else if (number < 10) {
    number = "00" + number;
  }
  return number;
}

async function GenerateUINForFamily(VillageCode) {
  //querying for the last modified UIN
  const village = await VillageModel.findOne({ villageCode: VillageCode });
  console.log(village);
  const LastModifiedUIN = village.LastModifiedUIN;
  let FamilyNumber = GetFamilyNumberFromUIN(LastModifiedUIN);
  FamilyNumber = parseInt(FamilyNumber) + 1;
  //FamilyNumber = FormatNumberAsThreeDigit(FamilyNumber);
  return (
    "IRNCE" + VillageCode + "F" + FormatNumberasThreeDigit(FamilyNumber) + "I"
  );
}

router.post("/", AuthMobile, async (request, response) => {
  //generating the UIN code for family here
  const username = request.user['username'];
  GenerateUINForFamily(request.body.villageCode).then(async (UIN) => {
    // iterate on request body to add UIn manually and save it to the database
    const familyMemberData = request.body.familyMemberData;

    let count = 0;
    let lastModifiedUIN = "";
    //personal info collection is a json array which contains the user objects and UIN
    familyMemberData.forEach((person) => {
      count++;
      person.UIN = UIN + FormatNumberasThreeDigit(count);
      lastModifiedUIN = person.UIN;
    });

    const FamCommonDataInstance = new FamilyModel({
      volunteerUserId: request.body.volunteerUserId,
      familyMemberData: request.body.familyMemberData,
      FamilyUIN: lastModifiedUIN.substring(0, 12),
      locationTopLeft: request.body.locationTopLeft,
      locationTopRight: request.body.locationTopRight,
      locationBottomLeft: request.body.locationBottomLeft,
      locationBottomRight: request.body.locationBottomRight,
      headOfFamily: request.body.headOfFamily,
      availabilityOfDrinkingWater: request.body.availabilityOfDrinkingWater,
      drinkingWaterSource: request.body.drinkingWaterSource,
      areToiletsAvailableInHouse: request.body.areToiletsAvailableInHouse,
      noToiletsWhy: request.body.noToiletsWhy,
      alternativeForHouseholdToilet: request.body.alternativeForHouseholdToilet,
      statusOfEnvironmentalSanitation:
        request.body.statusOfEnvironmentalSanitation,
      availabilityOfWaterInToilets: request.body.availabilityOfWaterInToilets,
      numberOfTwoWheelers: request.body.numberOfTwoWheelers,
      numberOfThreeWheelers: request.body.numberOfThreeWheelers,
      numberOfFourWheelers: request.body.numberOfFourWheelers,
      brandsOfTwoThreeWheelers: request.body.brandsOfTwoThreeWheelers,
      brandsOfFourWheelers: request.body.brandsOfFourWheelers,
      locallyAvailableFoodsConsumed: request.body.locallyAvailableFoodsConsumed,
      doYouOwnCattle: request.body.doYouOwnCattle,
      incomeFromCattle: request.body.incomeFromCattle,
      doYouOwnFarmLand: request.body.doYouOwnFarmLand,
      doYouPreserveSeeds: request.body.doYouPreserveSeeds,
      cropsCultivated: request.body.cropsCultivated,
      typesOfSeedsPreserved: request.body.typesOfSeedsPreserved,
      treesOwnedIfAny: request.body.treesOwnedIfAny,
      isKitchenGardenAvailable: request.body.isKitchenGardenAvailable,
      cropsInKitchenGarden: request.body.cropsInKitchenGarden,
      address: request.body.address,
      villageCode: request.body.villageCode,
    });

    FamCommonDataInstance.save().then((result) => {
      VillageModel.findOneAndUpdate(
        { villageCode: request.body.villageCode },
        { LastModifiedUIN: lastModifiedUIN },
        null,
        (error, docs) => {
          if (error) {
            console.log(error);
          } else {
            User.findOneAndUpdate(
                {username},
                {$inc: {NumberOfRecordsCollected: 1}},
                function (err, res) {
                });
            response
              .status(201)
              .send("Data Saved Successfully and UIN updated");
          }
        }
      );
    });
  });
});

module.exports = router;
