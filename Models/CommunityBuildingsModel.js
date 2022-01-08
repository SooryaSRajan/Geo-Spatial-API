const mongoose = require("mongoose");
const polygonSchema = require("./BuildingCoordinates");

const CommunityBuildingSchema = mongoose.Schema({
  resourceType: String,
  villageCode: {
    type: String,
    minlength: 3,
    maxlength: 3,
  },
  GeoJsonCommunityBuilding: polygonSchema,
});

const CommunityBuildingModel = mongoose.model(
  "community-building",
  CommunityBuildingSchema
);

module.exports = CommunityBuildingModel;
