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
const addrequest = async (type, data, id, title, date) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression:
      "SET #type = :type , #data = :data, #status = :status, #title = :title, #dateAdded= :date" ,
    ExpressionAttributeNames: {
      "#type": "type",
      "#data": "data",
      "#title": "title",
      "#status": "status",
      "#dateAdded":"dateAdded"
    },
    ExpressionAttributeValues: {
      ":type": type,
      ":data": data,
      ":title": title,
      ":status": "New",
      ":date": date

    },
  };
  return await dynamoClient.update(params).promise();
};

//add request to database
const approveRequests = async (id) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression:
      "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "Approved",
    },
 }
  // dynamoClient.batchWrite(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else console.log(data);// successful response
  // });

  return await dynamoClient.update(params).promise();
};

//add request to database
const denyRequests = async (id) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression:
      "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "Denied",
    },
  };
  // dynamoClient.batchGet(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else  console.log(data);// successful response
  // });

  return await dynamoClient.update(params).promise();
};


//add new employee
const addNewEmployee = async (_id, _name, _department, _designation, _level, _dateJoined, _email, _contact, _address, _remainingLeaves, _twRating) =>{
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
      twRating: _twRating,
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
const addstats = async (employeeID, comments, rating, teamworkScore, hours, postdate) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #comments = :vals , #rating = :rating, #teamscore = :tscore, #hoursworked = :hours, #date_posted = :postdate",
    ExpressionAttributeNames: {
      "#comments": "comments",
      "#rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursworked": "hoursworked",
      "#date_posted": "postdate"
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating": [rating],
      ":tscore": [teamworkScore],
      ":hours": [hours],
      ":postdate":postdate
    },
  };
  const params2 = {
    TableName: EMPLOYEE_TABLE,
    Key: { employeeID: employeeID },
    UpdateExpression:
      "SET #com = list_append(#com,:vals), #rating = list_append(#rating,:rating), #teamscore = list_append(#teamscore,:tscore),#hoursworked = list_append(#hoursworked,:hours), #date_posted = :postdate",
    ExpressionAttributeNames: {
      "#com": "comments",
      "#rating": "rating",
      "#teamscore": "teamworkScore",
      "#hoursworked": "hoursworked",
      "#date_posted": "postdate"
    },
    ExpressionAttributeValues: {
      ":vals": [comments],
      ":rating": [rating],
      ":tscore": [teamworkScore],
      ":hours": [hours],
      ":postdate":postdate
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
    ProjectionExpression: "#id, #Rating, #teamscore, #hoursWorked, #comments",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "employeeID",
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

// const getAnnouncements = async () => {
//   const params = {
//     TableName: ANNOUNCEMENTS_TABLE,
//     ProjectionExpression: " #aData ,#name,#title, #date",
//     ExpressionAttributeNames: {
//       "#aData": "announcements",
//       "#title": "title",
//       "#name": "name",
//       "#dateposted": "dateposted",
//     },
//   };
//   const getannoun = await dynamoClient.scan(params).promise();
//   return getannoun;
// };

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


approveRequests("134567");