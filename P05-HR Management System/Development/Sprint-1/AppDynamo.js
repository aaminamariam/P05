const AWS = require("aws-sdk");

require("dotenv").config();

//env variables
AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const JOBS_TABLE = "jobpostings";
const APPLICATION_TABLE = "";

//add new job
const addJob = async (title, des, dept, location) => {
  const result = Math.random().toString(36).substring(2, 15);
  const params = {
    TableName: JOBS_TABLE,
    Item: {
      title: title,
      description: des,
      dept: dept,
      location: location,
      date_posted: result,
    },
  };
  return await dynamoClient.put(params).promise();
};

//get number of jobs
const jobcount = async () => {
  const data = await dynamoClient
    .scan({ Select: "COUNT", TableName: JOBS_TABLE })
    .promise();
  return data;
};

//get jobs
const getjobs = async () => {
  const params = {
    TableName: JOBS_TABLE,
  };
  const jobs = await dynamoClient.scan(params).promise();
  return jobs;
};

//delete job
const deleteJob = async (date_posted) => {
  const params = {
    TableName: JOBS_TABLE,

    Key: { date_posted: date_posted.date },
  };
  await dynamoClient.delete(params).promise();

  return;
};

//apply for job
const addJobApplication = async (name, number, email, url, location) => {
  const params = {
    TableName: JOBS_TABLE,
    Item: {
      name: name,
      contact: number,
      email: email,
      linkedinUrl: url,
      location: location,
    },
  };
  return await dynamoClient.put(params).promise();
};

module.exports = {
  addJob,
  getjobs,
  jobcount,
  deleteJob,
  addJobApplication,
};
