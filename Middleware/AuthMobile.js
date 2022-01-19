const jwt = require("jsonwebtoken");

function isAdminOrMobileUser(array) {
    let IsAdmin = false;
    let IsUser = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "admin") {
            IsAdmin = true;
        } else if (array[i] === "user") {
            IsUser = true;
        }
    }
    if (IsAdmin || IsUser) {
        return true;
    }
}

module.exports = function (request, response, next) {
    //user sent token stored here
    const receiveToken = request.header("user-auth-token");

    //if no token is received return status code 401
    if (!receiveToken) {
        return response
            .status(401)
            .send("Token missing..Try again after logging in");
    }
    //token is received...verifying the token here

    try {
        request.user = jwt.verify(receiveToken, process.env.JWT_SECRET_KEY);

        const userRole = request.user.roles;

        if (isAdminOrMobileUser(userRole)) {
            next();
        }
    } catch (error) {
        //if the userToken is damaged or modified
        response.status(401).send("Invalid Token");
    }
};
