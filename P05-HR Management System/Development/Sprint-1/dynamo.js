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
const addOrUpdateEmployee = async (employee, name) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      employeeID: employee,
      name: name,
    },
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
// fetch employee requests by status active or inactive
const getEmployeeReqbystatus = async () => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: "#id, #option, #des, #status, #name",
    IndexName: "status-index",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames: {
      "#id": "employeeID",
      "#status": "status",
      "#option": "option",
      "#des": "description",
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":status": "active",
    },
  };
  const reqbyStatus = await dynamoClient.query(params).promise();
  console.log(reqbyStatus);
  return reqbyStatus;
};

// fetch employee requests by id
const getEmployeeReqbyID = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: "#id, #option, #des, #name,#popt,#papprove,#pdes,#st",
    KeyConditionExpression: "#id = :empid",
    ExpressionAttributeNames: {
      "#id": "employeeID",
      "#option": "option",
      "#des": "description",
      "#name": "name",
      "#st": "status",
      "#popt": "previous_options",
      "#papprove": "previous_approve",
      "#pdes": "previous_description",
    },
    ExpressionAttributeValues: {
      ":empid": id,
    },
  };
  const employees = await dynamoClient.query(params).promise();
  console.log(employees);
  return employees;
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

// approval of request
const approvedenyRequests = async (
  employeeID,
  approval,
  description,
  option
) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #approve = :approval, #status = :stat, #popt = :poption, #papprove = :pApp, #pdes = :pd",
    //#count = :counter",
    ExpressionAttributeNames: {
      "#approve": "approval",
      "#status": "status",
      "#popt": "previous_options",
      "#papprove": "previous_approve",
      "#pdes": "previous_description",
    },
    ExpressionAttributeValues: {
      ":approval": [approval],
      ":stat": ["inactive"],
      ":poption": [option],
      ":pApp": [approval],
      ":pd": [description],
    },
  };
  const params2 = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #status = list.append(#status:stat), #approve = list.append(#approve:approval), #popt = list.append(#popt,:poption), #papprove = list.append(#papprove,:pApp), #pdes = list.append(#pdes,:pd)",
    ExpressionAttributeNames: {
      "#approve": "approval",
      "#status": "status",
      "#popt": "previous_options",
      "#papprove": "previous_approve",
      "#pdes": "previous_description",
    },
    ExpressionAttributeValues: {
      ":approval": [approval],
      ":stat": ["inactive"],
      ":poption": [option],
      ":pApp": [approval],
      ":pd": [description],
    },
  };

  try {
    c1 = await dynamoClient.update(params2).promise();
    console.log("yay");
  } catch (err) {
    try {
      console.log("joj");
      c2 = await dynamoClient.update(params).promise();
    } catch (err2) {
      console.log(err2);
    }
  }
};

// const approvedenyRequests = async (
//   employeeID,
//   approval,
//   description,
//   option
// ) => {
//   const params = {
//     TableName: TABLE_NAME,
//     Key: { employeeID: employeeID },
//     UpdateExpression:
//       "SET #des = :description , #app = :approval, #teamscore = :tscore, #opt = :option",
//     ExpressionAttributeNames: {
//       "#des": "description",
//       "#opt": "option",
//       "#teamscore": "teamworkScore",
//       "#hoursworked": "hoursworked",
//     },
//     ExpressionAttributeValues: {
//       ":description": description,
//       ":option": option,
//       ":description": [rating],
//       ":tscore": [teamworkScore],
//       ":hours": [hours],
//     },
//   };
//   const params2 = {
//     TableName: TABLE_NAME,
//     Key: { employeeID: employeeID },
//     UpdateExpression:
//       "SET #com = list_append(#com,:vals), #rating = list_append(#rating,:rating), #teamscore = list_append(#teamscore,:tscore),#hoursworked = list_append(#hoursworked,:hours)",
//     ExpressionAttributeNames: {
//       "#com": "comments",
//       "#rating": "rating",
//       "#teamscore": "teamworkScore",
//       "#hoursworked": "hoursworked",
//     },
//     ExpressionAttributeValues: {
//       ":vals": [comments],
//       ":rating": [rating],
//       ":tscore": [teamworkScore],
//       ":hours": [hours],
//     },
//   };
//   try {
//     c1 = await dynamoClient.update(params2).promise();
//   } catch (err) {
//     try {
//       return await dynamoClient.update(params).promise();
//     } catch (err2) {
//       console.log(err2);
//     }
//   }
// };

//add employee statics
const addstats = async (employeeID, comments, rating, teamworkScore, hours) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #comments = :vals , #rating = :rating, #teamscore = :tscore, #hoursworked = :hours",
    ExpressionAttributeNames: {
      "#comments": "comments",
      "#rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursworked": "hoursworked",
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating": [rating],
      ":tscore": [teamworkScore],
      ":hours": [hours],
    },
  };
  const params2 = {
    TableName: TABLE_NAME,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #com = list_append(#com,:vals), #rating = list_append(#rating,:rating), #teamscore = list_append(#teamscore,:tscore),#hoursworked = list_append(#hoursworked,:hours)",
    ExpressionAttributeNames: {
      "#com": "comments",
      "#rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursworked": "hoursworked",
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating": [rating],
      ":tscore": [teamworkScore],
      ":hours": [hours],
    },
  };
  try {
    c1 = await dynamoClient.update(params2).promise();
  } catch (err) {
    try {
      c2 = await dynamoClient.update(params).promise();
    } catch (err2) {
      console.log(err2);
    }
  }
};

const getEmployeeStatsbyID = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: "#id, #Rating, #teamscore, #hoursWorked, #comments",
    KeyConditionExpression: "#ids = :id",
    ExpressionAttributeNames: {
      "#ids": "employeeID",
      "#Rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursWorked": "hoursworked",
      "#comments": "comments",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };
  const statsbyID = await dynamoClient.query(params).promise();
  return statsbyID;
};

const addAnnouncements = async (employeeID, aData) => {
  const params = {
    TableName: TABLE_NAME,
    Key:{employeeID: employeeID },
    UpdateExpression:
      "SET #aData = :val",
    ExpressionAttributeNames: {
      "#aData": "announcements",
    },
    ExpressionAttributeValues: {
      ":vals": [aData],
    }
  }
  c1 = await dynamoClient.update(params).promise();
};

const getAnnouncements = async () => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: "#id, #aData ",
    //KeyConditionExpression: "#ids = :id",
    ExpressionAttributeNames: {
     // "#ids": "employeeID",
      "#aData": "announcements",
    },
    // ExpressionAttributeValues: {
    //   ":id": id,
    // },
  };
  const getannoun = await dynamoClient.query(params).promise();
  return getannoun;
};

module.exports = {
  dynamoClient,
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
  getEmployeeRequests,
  getEmployeeReqbyID,
  getEmployeeReqbystatus,
  approvedenyRequests,
  addstats,
  getEmployeeStatsbyID,
  addAnnouncements,
  getAnnouncements
};
approvedenyRequests("4", "yes", "des", "other");
approvedenyRequests("4", "yes", "des9", "other");
