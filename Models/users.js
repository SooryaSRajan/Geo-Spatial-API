const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250,
  },
  email: {
    type: String,
    required: true,
    //can add a regex here to match
    unique: true,
  },
  roles: {
    type: [String],
    default: ["user"],
    validate: {
      validator: function (array) {
        var isValid = true;
        for (var i = 0; i < array.length; i++) {
          if (array[i] in ["user", "admin", "admin-web"]) {
            isValid = true;
          } else {
            isValid = false;
          }
        }
        return isValid;
      },
      message: "Invalid roles",
    },
  },
});

//method to generating a jwt token
UserSchema.methods.GenerateJwtToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, roles: this.roles },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

//creating a model for mongo Schema
const User = mongoose.model("User", UserSchema);

module.exports = {
  User: User,
};
