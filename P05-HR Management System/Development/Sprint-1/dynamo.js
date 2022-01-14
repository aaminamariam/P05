const AWS = require("aws-sdk");

require("dotenv").config();

//env variables
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

//fetch requests from database and approve/deny request
const getEmployeeRequests = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    //Key: {reqStatus: rStatus},
    Key: { employeeID: id },
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
const addrequest = async (option, des, id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: id },
    UpdateExpression:
      "SET #option = :option , #description = :description, #stat = :status",
    ExpressionAttributeNames: {
      "#option": "option",
      "#description": "description",
      "#stat": "status",
    },
    ExpressionAttributeValues: {
      ":option": option,
      ":description": des,
      ":status": "active",
    },
  };
  return await dynamoClient.update(params).promise();
};

const getEmployeeReqbyID = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: "#id, #option, #des, #stat",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "employeeID",
      "#stat": "status",
      "#option": "option",
      "#des": "description",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };
  const reqbyID = await dynamoClient.query(params).promise();
  return reqbyID;
};

//query by status
// const getEmployeeReqbystatus = async (id, status) => {
//   const params = {
//     TableName: TABLE_NAME,
//     Key: { employeeID: id },
//     ProjectionExpression: "#id, #stat, #option ,#des",
//     KeyConditionExpression: "#stat = :status",
//     ExpressionAttributeNames: {
//       "#id": "employeeID",
//       "#stat": "status",
//       "#option": "option",
//       "#des": "description",
//     },
//     ExpressionAttributeValues: {
//       ":status": status,
//     },
//   };
//   const reqbyID = await dynamoClient.query(params).promise();
//   return reqbyID;
// };
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

// approval of request
const approvedenyRequests = async (employeeID, approve) => {
  const status = "inactive";
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID },
    UpdateExpression: "SET #approve = :approval, #status = :stat",
    //#count = :counter",
    ExpressionAttributeNames: {
      "#approve": "approval",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":approval": approve,
      ":stat": "inactive",
    },
  };
  return await dynamoClient.update(params).promise();
};

//add employee statics
const addcomments = async (employeeID, comments, rating, teamworkScore) => {
  const status = "inactive";
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID, status: "active" },
    UpdateExpression: "SET #comments = :vals , #rating = :rating, #teamscore = :tscore",
    //#count = :counter",
    ExpressionAttributeNames: {
      "#comments": "comments",
      "#rating":"rate",
      "#teamscore" :" teamworkScore"
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating": [rating], 
      ":tscore":[teamworkScore]
      },
  };
  const params2 = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID, status: "active" },
    UpdateExpression: "SET #com = list_append(#com,:vals), SET #rating = list_append(#rating,:rating), SET #teamscore = list_append(#teamscore,:tscore)",
    ExpressionAttributeNames: {
      "#com": "comments",
      "#rating":"rating",
      "#teamscore":"teamworkScore"
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating":[rating], 
      ":tscore":[teamworkScore]
    },
  };
  try {
    c1 = await dynamoClient.update(params2).promise();
  } catch (err) {
    try {
      return await dynamoClient.update(params).promise();
    } catch (err2) {
      console.log(err2);
    }
  }
};
module.exports = {
  dynamoClient,
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
  getEmployeeRequests,
  getEmployeeReqbyID,
  approvedenyRequests,
  // addstats,
  addcomments,
};

addcomments("98","good job","4.5","4");