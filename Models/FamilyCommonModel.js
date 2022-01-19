const mongoose = require("mongoose");
const FamilyCommonSchemaObject = require("../Models/FamilyCommonSchema");
const polygonSchema = require("../Models/BuildingCoordinates");

const FamilyCommonSchema = new mongoose.Schema({
    UIN: String,
    userId: String,
    FamilyCommonData: FamilyCommonSchemaObject,
    GeoJsonHome: polygonSchema,
});

const FamilyCommonDataModel = mongoose.model(
    "FamilyCommonData",
    FamilyCommonSchema
);

module.exports = FamilyCommonDataModel;
