const Express = require("express");
const AuthMobile = require("../Middleware/AuthMobile");
const router = Express.Router();

router.post("/", AuthMobile, (request, response) => {});
module.exports = router;
