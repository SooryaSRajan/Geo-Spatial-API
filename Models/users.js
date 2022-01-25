const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateKey() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  console.log("NEW KEY GENERATED", text)
  return text
}

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
  verificationKey : {
    type: String,
  },
  roles: {
    type: [String],
    default: ["user"],
    validate: {
      validator: function (array) {
        let isValid = true;
        const roles = ["user", "admin", "admin-web"];
        for (let i = 0; i < array.length; i++) {
          console.log(array[i]);
          roles.includes(array[i]) ? (isValid = true) : (isValid = false);
        }
        console.log(isValid);
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
  return jwt.sign(
      {_id: this._id, username: this.username, roles: this.roles, verificationKey: this.verificationKey },
      process.env.JWT_SECRET_KEY
  );
};

//creating a model for mongo Schema
const User = mongoose.model("User", UserSchema);

module.exports = {
  User: User,
  generateKey: generateKey
};
