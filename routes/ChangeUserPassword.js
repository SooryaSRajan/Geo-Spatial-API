const Express = require("express");
const router = Express.Router();
const mongoose = require("mongoose");
const { User } = require("../Models/users");
const AuthMobile = require("../Middleware/AuthMobile");
const bcrypt = require("bcrypt");

router.put("/:username", AuthMobile, async (request, response) => {
  var username = request.params.username;
  var newpassword = request.body.password;

  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(newpassword, salt);

  const UserInstance = await User.findOneAndUpdate(
    { username: username },
    { password: HashedPassword },
    null,
    (err, doc) => {
      if (err) {
        return response.status(406).send(error);
      } else {
        return response.status(200).send("Password Changed Successfully");
      }
    }
  );
});

module.exports = router;
