const express = require("express");
const router = express.Router();
const communityBuildingModel = require("../Models/CommunityBuildingsModel");
const AuthMobile = require("../Middleware/AuthMobile");
const {User} = require("../Models/users");

router.post("/", AuthMobile, async (request, response) => {
    //create a new community building Instance
    const username = request.user['username'];

    const communityBuildingInstance = new communityBuildingModel({
        resourceType: request.body.resourceType,
        villageCode: request.body.villageCode,
        locationTopLeft: request.body.locationTopLeft,
        locationTopRight: request.body.locationTopRight,
        locationBottomLeft: request.body.locationBottomLeft,
        locationBottomRight: request.body.locationBottomRight,
    });

    await communityBuildingInstance.save(async function (err, product) {
        if (err) {
            response.status(418).send("Data not saved!");
        } else {

            User.findOneAndUpdate(
                {username},
                {$inc: {NumberOfRecordsCollected: 1}},
                function (err, res) {
                    response.status(201).send(product);

                });

        }
    });

});

module.exports = router;
