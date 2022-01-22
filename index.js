const Express = require("express");
const DBConnection = require("./config/ConnectDB");
const Login = require("./routes/Login");
const RegisterUser = require("./routes/Register");
const ValidTokenRoute = require("./routes/ValidTokenRoute");
const VillageInfo = require("./routes/VillageRoute");
const IndividualData = require("./routes/IndiDataCollect");
const UserInfo = require("./routes/userInfo");
const ChangeUserPassword = require("./routes/ChangeUserPassword");
const AddCommunityBuilding = require("./routes/CommunityBuildings");
const GetCommonRecords = require("./routes/GetCommonRecords");
const app = Express();

app.use(Express.json());

//establishing db connections
DBConnection();

//routes
app.use("/api/login", Login);
app.use("/api/validateToken", ValidTokenRoute);
app.use("/api/registerUser", RegisterUser);
app.use("/api/villageInfo", VillageInfo);
app.use("/api/IndividualData", IndividualData);
app.use("/api/getUserData", UserInfo);
app.use("/api/changeUserPassword", ChangeUserPassword);
app.use("/api/addCommunityBuilding", AddCommunityBuilding);
app.use("/api/getCommonRecords", GetCommonRecords);

app.get("/", (request, response) => {
    response.status(200).send("Welcome to the Geo spatial Api");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
