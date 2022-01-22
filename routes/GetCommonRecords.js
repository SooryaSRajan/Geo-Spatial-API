const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const FamilyDataModel = require("../Models/FamCommDataModel");
const router = Express.Router();


router.get("/", AuthMobile, async (request, response) => {
    console.log(request.user.username)
    FamilyDataModel.find({volunteerUserId: request.user.username}, function (err, user) {
        if (!err) {
            response.status(200).send(user);
        }
        else {
            response.status(404).send("Data not found");
        }
    });

});

module.exports = router;
