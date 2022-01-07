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

router.put(
  "/changePassword/:username",
  AuthMobile,
  async (request, response) => {
    var username = request.params.username;
    var newpassword = request.body.password;

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(newpassword, salt);

    const UserInstance = await User.findOneAndUpdate(
      { username: username },
      { password: HashedPassword },
      null,
      (err, doc) => {
        if (error) {
          return response.status(406).send(error);
        } else {
          return response.status(200).send("Password Changed Successfully");
        }
      }
    );
  }
);
module.exports = router;
