const Express = require("express");
const router = Express.Router();
const {User, generateKey} = require("../Models/users");
const AuthMobile = require("../Middleware/AuthMobile");
const bcrypt = require("bcrypt");

router.put("/", AuthMobile, async (request, response) => {
    const username = request.user['username'];
    const newPassword = request.body.password;
    const currentPassword = request.body.currentPassword;

    const CheckUser = await User.findOne({username});

    //if user record is not available then responds as a bad request
    if (!CheckUser)
        return response.status(400).send("User not found");

    //check if entered password and user password is same
    const compareCurrentPassword = await bcrypt.compare(
        currentPassword,
        CheckUser.password
    );
    //wrong password case
    if (!compareCurrentPassword)
        return response.status(400).send("Invalid Password");
    else {
        const newPasswordCheck = await bcrypt.compare(
            newPassword,
            CheckUser.password
        );
        if (newPasswordCheck) {
            return response.status(400).send("New password can't be same as old password");
        }
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(newPassword, salt);
        CheckUser.updateOne({password: HashedPassword, verificationKey: generateKey() }, async function (err, raw) {
            if (err) {
                response.send(err);
            }
            let updatedDoc = await User.findOne({username});
            return response.status(200).send(updatedDoc.GenerateJwtToken());

        });
    }
});

module.exports = router;
