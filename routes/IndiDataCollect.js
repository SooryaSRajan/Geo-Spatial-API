const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const router = Express.Router();
const VillageModel = require("../Models/villageInfo");
const PersonalDataModel = require("../Models/PersonalData");
const FamilyCommonDataModel = require("../Models/FamilyCommonModel");

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
    const village = await VillageModel.find({villageCode: VillageCode});
    const LastModifiedUIN = village[0].LastModifiedUIN;
    let FamilyNumber = GetFamilyNumberFromUIN(LastModifiedUIN);
    FamilyNumber = parseInt(FamilyNumber) + 1;
    FamilyNumber = FormatNumberasThreeDigit(FamilyNumber);
    return "IRNCE" + VillageCode + "F" + FamilyNumber + "I";
}

router.post("/", AuthMobile, async (request, response) => {
    if (request.isGenerated) {
        const IndividualPeopleInfoInstance = new PersonalDataModel({
            PersonalInfoCollection: request.body.PersonalInfoCollection,
        });

        const FamCommonDataInstance = new FamilyCommonDataModel({
            FamilyCommonData: request.body.FamilyCommonData,
            GeoJsonHome: request.body.GeoJsonHome,
        });

        const RegisteredPersonalInfo = await IndividualPeopleInfoInstance.save();
        const RegisteredFamilyCommonData = await FamCommonDataInstance.save();

        if (RegisteredPersonalInfo && RegisteredFamilyCommonData) {
            response.status(201).send("Data Saved Successfully");
        }
    } else {
        //generating the UIN code for family here
        var UINCode = GenerateUINForFamily(
            request.body.FamilyCommonData.VillageCode
        );
        // iterate on request body to add UIn manually and save it to the database
        var PersonalInfoCollection = request.body.PersonalInfoCollection;

        var count = 0;
        var lastModifiedUIN = "";
        //personal info collection is a json array which which contains the user objects and UIN
        PersonalInfoCollection.forEach((person) => {
            count++;
            person.UIN = UINCode + FormatNumberasThreeDigit(count);
            lastModifiedUIN = person.UIN;
        });

        const IndividualPeopleInfoInstance = new PersonalDataModel({
            PersonalInfoCollection: PersonalInfoCollection,
        });

        const FamCommonDataInstance = new FamilyCommonDataModel({
            UIN: lastModifiedUIN.substring(0, 12),
            FamilyCommonData: request.body.FamilyCommonData,
            GeoJsonHome: request.body.GeoJsonHome,
        });

        const RegisteredPersonalInfo = await IndividualPeopleInfoInstance.save();
        const RegisteredFamilyCommonData = await FamCommonDataInstance.save();

        if (RegisteredPersonalInfo && RegisteredFamilyCommonData) {
            //update the last modified UIN in the village collection
            const update = await VillageModel.findOneAndUpdate(
                {villageCode: request.body.FamilyCommonData.VillageCode},
                {LastModifiedUIN: lastModifiedUIN},
                null,
                (error, docs) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response
                            .status(201)
                            .send("Data Saved Successfully and UIN updated..!");
                    }
                }
            );
        }
    }
});

router.get("/", AuthMobile, async (request, response) => {
    const username = request.user;
    //all the data that is collected bu the username
    const InfoCollectedByUser =
        await PersonalDataModel.PersonalInfoCollection.find({
            username: username,
        });

    const UINlist = [];
    InfoCollectedByUser.forEach((person) => {
        UINlist.push(person.UIN);
    });

    response.status(200).send(UINlist);
});

module.exports = router;
