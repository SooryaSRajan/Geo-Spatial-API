const jwt = require("jsonwebtoken");
const Express = require("express");

function isAdminOrMobileUser(array) {
  var IsAdmin = false;
  var IsUser = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i] == "admin") {
      IsAdmin = true;
    } else if (array[i] == "user") {
      IsUser = true;
    }
  }
  if (IsAdmin || IsUser) {
    return true;
  }
}

module.exports = function (request, response, next) {
  //user sent token stored here
  const RecievedToken = request.header("user-auth-token");

  //if no token is received return status code 401
  if (!RecievedToken) {
    return response
      .status(401)
      .send("Token missing..Try again after logging in");
  }
  //token is received...verifying the token here

  try {
    const VerifyToken = jwt.verify(RecievedToken, process.env.JWT_SECRET_KEY);
    request.user = VerifyToken;

    var userRole = request.user.roles;

    if (isAdminOrMobileUser(userRole)) {
      next();
    }
  } catch (error) {
    //if the userToken is damaged or modified
    response.status(401).send("Invalid Token");
  }
};
