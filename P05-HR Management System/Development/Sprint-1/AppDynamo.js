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
const addJob = async (title,des,dept,location) => {
  const postdate = new Date().toLocaleString();
    const params = {
      TableName: JOBS_TABLE,
      Item: {
        title: title,
        description: des,
        dept: dept,
        location: location,
        date_posted: postdate
      },
    };
    return await dynamoClient.put(params).promise();
  };

//get jobs
const getjobs= async () => {
  const params = {
    TableName: JOBS_TABLE,
  };
  const jobs = await dynamoClient.scan(params).promise();
  return jobs;
};

//apply for job
const addJobApplication = async (name,number,email, url,location) => {
    const params = {
      TableName: JOBS_TABLE ,
      Item: {
        name: name,
        contact: number,
        email: email,
        linkedinUrl: url,
        location: location
      },
    };
    return await dynamoClient.put(params).promise();
  };

  module.exports =  { 
      addJob,
      getjobs,
      addJobApplication 
    };
  