const AWS = require("aws-sdk");

require("dotenv").config();

//env variables
AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = "employee_table";
const EMPLOYEE_TABLE = "employee_directory";
const REQUESTS_TABLE = "requests_table";
const ANNOUNCEMENTS_TABLE = "announcements_table";

process.env.TOKEN_SECRET;
const login = async (id) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    KeyConditionExpression: "#ids = :id",
    ProjectionExpression: "#ids, #password",
    ExpressionAttributeNames: {
      "#ids": "id",
      "#password": "password",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  const loginpass = await dynamoClient.query(params).promise();
  return loginpass;
};
const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

// auth token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

// rest apis

module.exports = {
  login,
  generateAccessToken,
  authenticateToken,
};
