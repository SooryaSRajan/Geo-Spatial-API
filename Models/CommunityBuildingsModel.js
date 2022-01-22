const mongoose = require("mongoose");

const CommunityBuildingSchema = mongoose.Schema({
  volunteerUserId: String,
  resourceType: String,
  villageCode: {
    type: String,
    minlength: 3,
    maxlength: 3,
  },
  locationTopLeft: [Number],
  locationTopRight: [Number],
  locationBottomLeft: [Number],
  locationBottomRight: [Number],
  //GeoJsonCommunityBuilding: polygonSchema,
});

const CommunityBuildingModel = mongoose.model(
  "community-building",
  CommunityBuildingSchema
);

module.exports = CommunityBuildingModel;
