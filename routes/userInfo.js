const Express = require("express");
const router = Express.Router();

const mongoose = require("mongoose");
const { User } = require("../Models/users");
const AuthMobile = require("../Middleware/AuthMobile");

router.get("/", AuthMobile, async (request, response) => {
  const UserInfo = await User.find({ username: request.user.username });
  response.status(200).send(UserInfo);
});
module.exports = router;
