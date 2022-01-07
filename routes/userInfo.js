const Express = require("express");
const router = Express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const { User } = require("../Models/users");
const AuthMobile = require("../Middleware/AuthMobile");
const bcrypt = require("bcrypt");

router.get("/", AuthMobile, async (request, response) => {
  const UserInfo = await User.find({ username: request.user.username });

  var UserInfoList = [];
  UserInfo.forEach((user) => {
    UserInfoList.push(
      _.pick(user, [
        "Name",
        "username",
        "gender",
        "DateJoined",
        "NumberOfRecordsCollected",
      ])
    );
  });
  response.status(200).send(UserInfoList);
});

module.exports = router;
