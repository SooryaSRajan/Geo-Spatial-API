const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const router = Express.Router();


router.get("/", AuthMobile, async (request, response) => {
    response.status(200).send("Valid Token!");
});

module.exports = router;
