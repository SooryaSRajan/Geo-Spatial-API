const Express = require("express");
const router = Express.Router();
const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const AdminWebAuth = require("../Middleware/AdminWebAuth");

router.post("/", AdminWebAuth, async (request, response) => {
  // check if the user is already there in the data base
  const CheckIfUserIsAlreadyRegistered = await User.findOne({
    username: request.body.username,
  });

  if (CheckIfUserIsAlreadyRegistered)
    return response
      .status(400)
      .send("User Already Exists. Please Try to Login..!");

  const CreateUserInstance = new User({
    Name: request.body.Name,
    username: request.body.username,
    password: request.body.password,
    roles: request.body.username,
    //two added fields pending
  });

  //encrypting the user password before saving to the database
  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(CreateUserInstance.password, salt);

  // reassigning the hashed password in the place of the password
  CreateUserInstance.password = HashedPassword;

  //save into the database
  const UserRegistered = await CreateUserInstance.save();

  response.status(201).send("Registration Successful. Please Login");
});

module.exports = router;
