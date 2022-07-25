const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const FamilyDataModel = require("../Models/FamCommDataModel");
const router = Express.Router();
const CommunityBuildingModel = require("../Models/CommunityBuildingsModel");


router.get("/familyData", AuthMobile, async (request, response) => {
    console.log(request.user.username)
    FamilyDataModel.find({volunteerUserId: request.user.username}, function (err, user) {
        if (!err) {
            response.status(200).send(user);
        } else {
            response.status(400).send("Data not found");
        }
    });

});

router.get("/individualData", AuthMobile, async (request, response) => {
    console.log(request.user.username)
    CommunityBuildingModel.find({volunteerUserId: request.user.username}, function (err, user) {
        if (!err) {
            response.status(200).send(user);
        } else {
            response.status(400).send("Data not found");
        }
    });

});

router.get("/deleteFamilyData", AuthMobile, async (request, response) => {
    const id = request.body.id
    FamilyDataModel.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err)
            response.status(400).send("Data not found, could not delete record");
        }
        else{
            console.log("Deleted : ", docs);
            response.status(200).send("Deleted successfully!");
        }
    });

});

router.get("/deleteCommunityData", AuthMobile, async (request, response) => {
    const id = request.body.id
    CommunityBuildingModel.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err)
            response.status(400).send("Data not found, could not delete record");
        }
        else{
            console.log("Deleted : ", docs);
            response.status(200).send("Deleted successfully!");
        }
    });

});

module.exports = router;
