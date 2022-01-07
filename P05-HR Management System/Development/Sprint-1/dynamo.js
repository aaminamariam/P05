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
const getEmployees = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const employees = await dynamoClient.scan(params).promise();
  return employees;
};

// add to database
const addOrUpdateEmployee = async (employee) => {
  const params = {
    TableName: TABLE_NAME,
    Item: employee,
  };
  return await dynamoClient.put(params).promise();
};

//add request to database
const addrequest = async (option, des, id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: id },
    UpdateExpression: `SET #option = :option, #description = :description`,
    ExpressionAttributeNames: {
      "#option": "option",
      "#description": "description",
    },
    ExpressionAttributeValues: {
      ":option": option,
      ":description": des,
      
    },
  };

  return await dynamoClient.update(params).promise();
};

const deleteEmployee = async (employeeID) => {
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
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
};