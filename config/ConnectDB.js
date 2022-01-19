const mongoose = require("mongoose");
require("dotenv").config();

//Connecting the Database
function ConnectDatabase() {
  var DatabaseConnection = mongoose.connect(
    //returns Promise
      'mongodb://localhost:27017/geoSpatial'
    //`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@geo-spatial.zuwu9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  );

  DatabaseConnection.then(() => {
    console.log("Connection to the database successfully");
  });
  DatabaseConnection.catch((error) => {
    console.log(`Connection Refused...${error}`);
  });
}
module.exports = ConnectDatabase;
