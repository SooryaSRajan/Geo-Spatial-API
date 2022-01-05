const Express = require("express");
const DBConnection = require("./configs/DatabaseConnection");

const app = Express();

app.use(Express.json());

DBConnection();

app.get("/", (request, response) => {
  response.status.send("Welcome to the Geo spatial Api");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
