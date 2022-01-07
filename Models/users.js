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
  roles: {
    type: [String],
    default: ["user"],
    validate: {
      validator: function (array) {
        var isValid = true;
        var roles = ["user", "admin", "admin-web"];
        for (var i = 0; i < array.length; i++) {
          roles.includes(array[i]) ? (isValid = true) : (isValid = false);
        }
        return isValid;
      },
      message: "Invalid roles",
    },
  },

  NumberOfRecordsCollected: {
    type: Number,
    default: 0,
  },

  DateJoined: {
    type: Date,
    default: Date.now,
  },

  gender: {
    type: String,
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
