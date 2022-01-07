const Express = require("express");
const router = Express.Router();

const mongoose = require("mongoose");
const UserModel = require("../Models/users");
const AuthMobile = require('../Middleware/AuthMobile');

router.get("/",AuthMobile,async (request, response) => {
    const UserInfo = await UserModel.find({ username: request.user.username });
    response.status.(200).send(UserInfo);
})
module.exports = router;


