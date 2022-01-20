const Express = require("express");
const router = Express.Router();
const _ = require("lodash");
const { User } = require("../Models/users");
const AuthMobile = require("../Middleware/AuthMobile");
const moment = require("moment");

function formatDate(date) {
  // "2022-01-07T18:08:57.250Z" -- sample
  return String(moment(date).format("YYYY-MM-DD"))
    .split("-")
    .reverse()
    .join("-");
}

router.get("/", AuthMobile, async (request, response) => {
  const UserInfo = await User.find({ username: request.user.username });

    const UserInfoList = [];
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

    console.log(UserInfoList);
    UserInfoList.forEach((user) => {
      user.DateJoined = formatDate(user.DateJoined);
    });
    console.log(UserInfoList);
  });
  response.status(200).send(UserInfoList);
});

module.exports = router;
