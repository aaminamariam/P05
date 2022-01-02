const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "employee_table";

// fetch from database
const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const characters = await dynamoClient.scan(params).promise();
  return characters;
};

// add to database
const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };
  return await dynamoClient.put(params).promise();
};
const deleteCharacter = async (employeeID) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID },
  };
  await dynamoClient.delete(params).promise();
  console.log("deleted");
  return;
};
module.exports = {
  dynamoClient,
  getCharacters,
  addOrUpdateCharacter,
  deleteCharacter,
};
