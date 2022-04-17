const AWS = require("aws-sdk");

require("dotenv").config();

//env variables
AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const EMPLOYEE_STATS = "employee_stats";
const EMPLOYEE_TABLE = "employee_directory";
const REQUESTS_TABLE = "requests_table";
const ANNOUNCEMENTS_TABLE = "announcements_table";
//const EMPLOYEE_STATS="";

// fetch from database
const getEmployees = async () => {
  const params = {
    TableName: EMPLOYEE_TABLE,
  };
  const employees = await dynamoClient.scan(params).promise();
  return employees;
};

const getEmployeeGenderMale = async () => {
  const paramsMale = {
    TableName: EMPLOYEE_TABLE,
    FilterExpression: "#Gender = :Gender",
    // KeyConditionExpression: "",
    ExpressionAttributeNames: {
      "#Gender": "Gender",
    },
    ExpressionAttributeValues: {
      ":Gender": "Male",
    },
  };

  const male = await dynamoClient.scan(paramsMale).promise();
  return male;
};
const getEmployeeGenderFemale = async () => {
  const paramsFemale = {
    TableName: EMPLOYEE_TABLE,
    FilterExpression: "#Gender = :Gender",
    // KeyConditionExpression: "",
    ExpressionAttributeNames: {
      "#Gender": "Gender",
    },
    ExpressionAttributeValues: {
      ":Gender": "Female",
    },
  };
  const female = await dynamoClient.scan(paramsFemale).promise();

  return female;
};

const getWorkingModeOnSite = async () => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    FilterExpression: "#WorkingMode = :WorkingMode",
    // KeyConditionExpression: "",
    ExpressionAttributeNames: {
      "#WorkingMode": "WorkingMode",
    },
    ExpressionAttributeValues: {
      ":WorkingMode": "OnSite",
    },
  };
  const onsite = await dynamoClient.scan(params).promise();
  return onsite;
};

const getWorkingModeRemote = async () => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    FilterExpression: "#WorkingMode = :WorkingMode",
    // KeyConditionExpression: "",
    ExpressionAttributeNames: {
      "#WorkingMode": "WorkingMode",
    },
    ExpressionAttributeValues: {
      ":WorkingMode": "Remote",
    },
  };
  const remote = await dynamoClient.scan(params).promise();
  return remote;
};

//employee stats
const getEmployeeStatsbyID = async (id) => {
  const params = {
    TableName: EMPLOYEE_STATS,
    ProjectionExpression:
      "#id, rating, teamworkScore, hoursworked, comments,postdate",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };
  ConditionExpression = "attribute_exists(id)";
  const statsbyID = await dynamoClient.query(params).promise();
  return statsbyID;
};
const changepassword = async (id, password) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    Key: { id: id },
    UpdateExpression: "SET #password = :password",
    ExpressionAttributeNames: {
      "#password": "password",
    },
    ExpressionAttributeValues: {
      ":password": password,
    },
  };
  return await dynamoClient.update(params).promise();
};

const login = async (id) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    KeyConditionExpression: "#ids = :id",
    ProjectionExpression: "#ids, #password,#name, #role",
    ExpressionAttributeNames: {
      "#ids": "id",
      "#password": "password",
      "#name": "name",
      "#role": "role",
    },
    ExpressionAttributeValues: {
      ":id": id,
    },
  };

  const loginpass = await dynamoClient.query(params).promise();
  return loginpass;
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
      "SET #type = :type , #data = :data, #status = :status, #title = :title, #dateAdded= :date",
    ExpressionAttributeNames: {
      "#type": "type",
      "#data": "data",
      "#title": "title",
      "#status": "status",
      "#dateAdded": "dateAdded",
    },
    ExpressionAttributeValues: {
      ":type": type,
      ":data": data,
      ":title": title,
      ":status": "New",
      ":date": date,
    },
  };
  return await dynamoClient.update(params).promise();
};

//add request to database
const approveRequests = async (id) => {
  const params = {
    TableName: REQUESTS_TABLE,
    Key: { id: id },
    UpdateExpression: "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "Approved",
    },
  };
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
    UpdateExpression: "SET #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": "Denied",
    },
  };

  return await dynamoClient.update(params).promise();
};

//add new employee
const addNewEmployee = async (
  _id,
  _name,
  _department,
  _designation,
  _level,
  _role,
  _password,
  _dateJoined,
  _email,
  _contact,
  _address,
  _gender
) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    Item: {
      id: _id,
      name: _name,
      department: _department,
      designation: _designation,
      level: _level,
      role: _role,
      password: _password,
      dateJoined: _dateJoined,
      email: _email,
      contact: _contact,
      address: _address,
      gender: _gender,
      //dateOfBirth: _dateOfBirth
      //twRating: _twRating,
    },
  };
  return await dynamoClient.put(params).promise();
};

const employeecount = async () => {
  const data = await dynamoClient
    .scan({ Select: "COUNT", TableName: EMPLOYEE_TABLE })
    .promise();
  return data;
};

// add to database
const addOrUpdateEmployee = async (employee, name, password, role) => {
  const params = {
    TableName: EMPLOYEE_TABLE,
    Item: {
      id: employee,
      name: name,
      password: password,
      role: role,
    },
  };
  return await dynamoClient.put(params).promise();
};
const get_password = async (id) => {
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
// fetch employee requests by status active or inactive
// const getEmployeeReqbystatus = async () => {
//   const params = {
//     TableName: REQUESTS_TABLE,
//     ProjectionExpression: "#id, #option, #des, #status, #name",
//     IndexName: "status-index",
//     KeyConditionExpression: "#status = :status",
//     ExpressionAttributeNames: {
//       "#id": "employeeID",
//       "#status": "status",
//       "#option": "option",
//       "#des": "description",
//       "#name": "name",
//     },
//     ExpressionAttributeValues: {
//       ":status": "active",
//     },
//   };
//   const reqbyStatus = await dynamoClient.query(params).promise();
//   console.log(reqbyStatus);
//   return reqbyStatus;
// };

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
//add employee stats
const addstats = async (
  id,
  comments,
  rating,
  teamworkScore,
  hours,
  postdate
) => {
  const params = {
    TableName: EMPLOYEE_STATS,
    Item: {
      id: id,
      comments: comments,
      rating: rating,
      teamworkScore: teamworkScore,
      hoursworked: hours,
      postdate: postdate,
    },
  };
  return await dynamoClient.put(params).promise();
};

const addNewAnnouncement = async (
  id,
  postedBy,
  title,
  department,
  data,
  datePosted
) => {
  const params = {
    TableName: ANNOUNCEMENTS_TABLE,
    Item: {
      id: id,
      title: title,
      postedBy: postedBy,
      department: department,
      data: data,
      datePosted: datePosted,
    },
  };
  console.log("Dynamo recieved: ", params.Item);
  try {
    newAnnouncement = await dynamoClient.put(params).promise();
  } catch (error) {
    console.error(error);
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
const cvcount = async () => {
  const data = await dynamoClient
    .scan({ Select: "COUNT", TableName: "cv_table" })
    .promise();
  return data;
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

  //getEmployeeReqbystatus,
  getEmployeeGenderMale,
  getEmployeeGenderFemale,

  employeecount,
  addstats,
  getEmployeeStatsbyID,
  addNewAnnouncement,
  getAnnouncements,
  cvcount,
  login,
  getWorkingModeRemote,
  getWorkingModeOnSite,
  changepassword,
  get_password,
};
