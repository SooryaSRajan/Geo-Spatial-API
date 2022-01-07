const Express = require("express");
const router = Express.Router();
const AuthMobile = require("../Middleware/AuthMobile");
const AdminWebAuth = require("../Middleware/AdminWebAuth");
const Village = require("../Models/villageInfo");
const _ = require("lodash");

router.post("/", AdminWebAuth, async (request, response) => {
  const { villageName, villageCode, UIN } = request.body;
  const VillageInstance = new Village({
    villageName: villageName,
    villageCode: villageCode,
    LastModifiedUIN: UIN,
  });

  const RegisteredVillage = await VillageInstance.save();

  response.status(201).send(RegisteredVillage);
});

router.get("/getVillageInfo", AuthMobile, async (request, response) => {
  const VillageInfo = await Village.find({});

  var villageInfo = [];

  VillageInfo.forEach((village) => {
    villageInfo.push(
      _.pick(village, ["villageName", "villageCode", "LastModifiedUIN"])
    );
  });
  response.status(200).send(villageInfo);
});

module.exports = router;
