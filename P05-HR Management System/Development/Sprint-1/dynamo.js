const AWS = require("aws-sdk");
const bcrypt = require('bcryptjs');


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

// fetch from database
const getEmployees = async () => {
  const params = {
    TableName: EMPLOYEE_TABLE,
  };
  const employees = await dynamoClient.scan(params).promise();
  return employees;
};

//fetch requests from database and approve/deny request
const getEmployeeRequests = async (id) => {
  const params = {
    TableName: REQUESTS_TABLE,
  };
  const requests = await dynamoClient.scan(params).promise();
  return requests;
};

//add request to database
const addrequest = async (option, des, id, date) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { employeeID: id },
    UpdateExpression:
      "SET #option = :option , #description = :description, #status = :status",
    ExpressionAttributeNames: {
      "#option": "option",
      "#description": "description",
      "#stat": "status",
    },
    ExpressionAttributeValues: {
      ":option": option,
      ":description": des,
      ":status": "new",
    },
  };
  return await dynamoClient.update(params).promise();
};

//add request to database
const approveRequests = async (ids) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression:
      "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "approved",
    },
  };
  return await dynamoClient.update(params).promise();
};

//add request to database
const denyRequests = async (ids) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression:
      "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "denied",
    },
  };
  return await dynamoClient.update(params).promise();
};


//add new employee
const addNewEmployee = async (_id, _name, _department, _designation, _level, _dateJoined, _email, _contact, _address, _remainingLeaves, _password) =>{
  const params = {
    TableName: EMPLOYEE_TABLE,
    Item: {
      id: _id, 
      name: _name, 
      department: _department, 
      designation: _designation, 
      level: _level, 
      dateJoined: _dateJoined, 
      email: _email, 
      contact: _contact, 
      address: _address, 
      remainingLeaves: _remainingLeaves, 
      password: _password,
    }
  }
  return await dynamoClient.put(params).promise();
}

// add to database
const addOrUpdateEmployee = async (employee, name) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    Item: {
      employeeID: employee,
      name: name,
    },
  };
  return await dynamoClient.put(params).promise();
};

// fetch employee requests by status active or inactive
const getEmployeeReqbystatus = async () => {
  const params = {
    TableName: REQUESTS_TABLE,
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
    TableName: EMPLOYEE_TABLE,
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
    TableName: EMPLOYEE_TABLE,

    Key: { employeeID },
  };
  await dynamoClient.delete(params).promise();
  console.log("deleted");
  return;
};

//add employee statics
const addstats = async (employeeID, comments, rating, teamworkScore, hours) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
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
    TableName: EMPLOYEE_TABLE,
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
    TableName: EMPLOYEE_TABLE,
    ProjectionExpression:
      "#ids, #Rating, #teamscore, #hoursWorked, #comments, #joindate",
    KeyConditionExpression: "#ids = :id",
    ExpressionAttributeNames: {
      "#ids": "id",
      "#Rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursWorked": "hoursworked",
      "#comments": "comments",
      "#joindate": "dateJoined",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };
  const statsbyID = await dynamoClient.query(params).promise();
  return statsbyID;
};

// adding announcements
// const addAnnouncements = async (employeeID, title, aData, date) => {
//   const params = {
//     TableName: ANNOUNCEMENTS_TABLE,
//     Key: { announcement_id: announcement_id },
//     UpdateExpression: "SET #aData = :vals, #aDatePosted = :dt, #title  = :tit",
//     ExpressionAttributeNames: {
//       "#aData": "announcements",
//       "#aDatePosted": "date",
//       "#title": "title",
//     },
//     ExpressionAttributeValues: {
//       ":vals": [aData],
//       ":dt": [dateposted],
//       ":tit": [title],
//     },
//   };
//   const params2 = {
//     TableName: ANNOUNCEMENTS_TABLE,
//     Key: { announcement_id: announcement_id },
//     UpdateExpression:
//       "SET #aData = list_append(#aData,:vals), #aDatePosted = list_append(#aDatePosted,:dt), #title  = list_append(#title,:tit)",
//     ExpressionAttributeNames: {
//       "#aData": "announcements",
//       "#aDatePosted": "dateposted",
//       "#title": "title",
//     },
//     ExpressionAttributeValues: {
//       ":vals": [aData],
//       ":dt": [dateposted],
//       ":tit": [title],
//     },
//   };
//   try {
//     c1 = await dynamoClient.update(params2).promise();
//   } catch (err) {
//     try {
//       c2 = await dynamoClient.update(params).promise();
//     } catch (err2) {
//       console.log(err2);
//     }
//   }
// };

const addNewAnnouncement = async (id, postedBy, title, department, data, datePosted) => {
  
  const params = {
    TableName: ANNOUNCEMENTS_TABLE,
    Item: {
      id: id, 
      title: title,
      postedBy: postedBy,
      department: department,
      data: data,
      datePosted: datePosted,
    }
  }
  console.log("Dynamo recieved: ", params.Item)
  try{
    newAnnouncement = await dynamoClient.put(params).promise();
  }
  catch (error){
    console.error(error)
  }
 
  return newAnnouncement;
};

const getAnnouncements = async () => {
  const params = {
    TableName: ANNOUNCEMENTS_TABLE,
  };
  const announcements = await dynamoClient.scan(params).promise();
  return announcements;
};



module.exports = {
  dynamoClient,
  getEmployees,
  addNewEmployee,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
  approveRequests,
  denyRequests,
  getEmployeeRequests,
  getEmployeeReqbyID,
  getEmployeeReqbystatus,
  
  
  addstats,
  getEmployeeStatsbyID,
  // addAnnouncements,
  addNewAnnouncement,
  getAnnouncements,
};

// const salt =  bcrypt.genSalt(10);
// const hashedPassword =  bcrypt.hash("root", salt);
// addNewEmployee ("root", "root", "root", "root", "root", "root", "root", "root", "root", "root", hashedPassword)
