const AWS = require("aws-sdk");

require("dotenv").config();

//env variables
AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const CV_TABLE = "cv_table";

const add_cv_data = async (Name, city, Linkedin, phone, email, cv, sp, job) => {
  date = new Date();
  //sp is for state/province
  let dt = date.toString();
  const params = {
    TableName: "cv_table",
    Key: { date: dt },
    UpdateExpression:
      "SET #name = :name, #city = :city, #linkedin = :linkedin, #phone = :phone, #email = :email, #cv = :cv, #sp = :sp,#job = :job",
    ExpressionAttributeNames: {
      "#name": "name",
      "#city": "city",
      "#linkedin": "linkedin",
      "#phone": "phone",
      "#email": "email",
      "#cv": "cv",
      "#sp": "sp",
      "#job": "job_applied",
    },
    ExpressionAttributeValues: {
      ":name": Name,
      ":city": city,
      ":linkedin": Linkedin,
      ":phone": phone,
      ":email": email,
      ":cv": cv,
      ":sp": sp,
      ":job": job,
    },
  };
  return await dynamoClient.update(params).promise();
};

//fetch requests from database and approve/deny request
const getapplications = async () => {
  const params = {
    TableName: CV_TABLE,
  };
  return await dynamoClient.scan(params).promise();
};

module.exports = { add_cv_data, getapplications };
// console.log(getapplications());
