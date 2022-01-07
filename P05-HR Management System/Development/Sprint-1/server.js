//require express and create instance
var express = require("express");
var app = express();

// On localhost:3000
app.get("/", function (req, res) {
  res.send("<b>My</b> first express http server");
});
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
// On localhost:3000/welcome
app.get("/welcome", function (req, res) {
  res.send("<b>Hello</b> welcome to my http server made with express");
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 5000.");
});
