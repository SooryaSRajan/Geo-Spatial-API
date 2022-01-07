const Express = require("express");
const DBConnection = require("./configs/DatabaseConnection");
const Login = require("./routes/Login");
const RegisterUser = require("./routes/Register");
const VillageInfo = require("./routes/VillageRoute");
const IndividualData = require("./routes/IndiDataCollect");

const app = Express();

app.use(Express.json());

DBConnection();

app.use("/api/login", Login);
app.use("/api/registerUser", RegisterUser);
app.use("/api/villageInfo", VillageInfo);
app.use("/api/IndividualData", IndividualData);

app.get("/", (request, response) => {
  response.status.send("Welcome to the Geo spatial Api");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
