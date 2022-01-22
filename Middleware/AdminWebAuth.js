const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    //user sent token stored here
    const receivedToken = request.header("user-auth-token");

    //if no token is received return status code 401
    if (!receivedToken) {
        return response
            .status(401)
            .send("Token missing..Try again after logging in");
    }
    //token is received...verifying the token here

    try {
        request.user = jwt.verify(receivedToken, process.env.JWT_SECRET_KEY);

        const userRole = request.user.roles;
        let isAdmin = false;
        let IsAdminWeb = false;
        for (let i = 0; i < userRole.length; i++) {
            if (userRole[i] === "admin") {
                isAdmin = true;
            } else if (userRole[i] === "admin-web") {
                IsAdminWeb = true;
            }
        }

        if (isAdmin && IsAdminWeb) {
            next();
        }
    } catch (error) {
        //if the userToken is damaged or modified
        response.status(401).send("Invalid Token");
    }
};
