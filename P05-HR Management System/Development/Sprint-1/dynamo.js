const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "employeeTable";

// fetch from database
const getEmployees = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const employees = await dynamoClient.scan(params).promise();
  return employees;
};

//fetch requests from database and approve/deny request
  const getEmployeeRequests = async (id) => {
    const params = {
      TableName: TABLE_NAME,
      //Key: {reqStatus: rStatus},
      Key: { employeeID:id},
    };
    const requests = await dynamoClient.scan(params).promise();
    return requests;
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
const addrequest = async (option, des,id, rStatus) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: id,
      status:rStatus},
    //UpdateExpression: "SET #opt = list_append(#opt, :option), #des = list_append(#des, :description)",
    // UpdateExpression: `SET #option = :option , #description = :description, #stat = :status`,
    UpdateExpression: "SET #option = :option , #description = :description",
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

const getEmployeeReqbyID = async (id, rstatus) => {
  const params = {
    TableName: TABLE_NAME,
    // ProjectionExpression:"#id, #option, #description, #stat",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames:{
      "#id": "employeeID",
      // "#stat":"status",
    },
    ExpressionAttributeValues: {
      ":id": id,
      // ":status": rstatus,
    }
  };
  const reqbyID = await dynamoClient.query(params).promise();
  return reqbyID;
};

//query by status
const getEmployeeReqbystatus = async (id, rstatus) => {
  const params = {
    TableName: TABLE_NAME,
    // Key: {employeeID: id },
    ProjectionExpression:"#id, #stat, #option ,#des",
    KeyConditionExpression: "#id = :id and #stat = :status",
    ExpressionAttributeNames:{
      "#id":"employeeID",
      "#stat":"status",
      "#option":"option",
      "#des": "description"
    },
    ExpressionAttributeValues: {
      ":id":id,
      ":status": rstatus,
    }
  };
  const reqbyID = await dynamoClient.query(params).promise();
  return reqbyID;
};
//delete employee from the database
const deleteEmployee = async (employeeID) => {
  const params = {
    TableName: TABLE_NAME,
    
    Key: { employeeID },
  };
  await dynamoClient.delete(params).promise();
  console.log("deleted");
  return;
};

// status-> ACTIVE/INACTIVE
// reqstatus -> approve/deny

module.exports = {
  dynamoClient,
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
  getEmployeeRequests,
  getEmployeeReqbyID,
  getEmployeeReqbystatus,
};

