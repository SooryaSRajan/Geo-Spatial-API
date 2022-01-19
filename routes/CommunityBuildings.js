const express = require("express");
const router = express.Router();
const communityBuildingModel = require("../Models/CommunityBuildingsModel");
const AuthMobile = require("../Middleware/AuthMobile");

router.post("/", AuthMobile, async (request, response) => {
    //create a new community building Instance
    const communityBuildingInstance = new communityBuildingModel({
        resourceType: request.body.resourceType,
        villageCode: request.body.villageCode,
        locationTopLeft: request.body.locationTopLeft,
        locationTopRight: request.body.locationTopRight,
        locationBottomLeft: request.body.locationBottomLeft,
        locationBottomRight: request.body.locationBottomRight,
        //GeoJsonCommunityBuilding: request.body.GeoJsonCommunityBuilding,
    });

    const saveCommunityBuilding = await communityBuildingInstance.save();

    response.status(201).send(saveCommunityBuilding);
});

module.exports = router;
