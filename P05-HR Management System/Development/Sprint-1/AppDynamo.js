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

 var express = require("express");
 var app = express();

 
  const {
  addJob,
  getjobs,
  addJobApplication
 } = require("./AppDynamo");

  const cors = require("cors");
 app.use(
   cors({
     origin: "*",
   })
 );

  app.use(express.json());

  app.get("/", (req, res) => {
   res.send("Hello world");
 });

 
  //post new job
 app.post("/addnewposting",async (req,res) => {
     const data = req.body

      const title = data.title
     const description = data.description
     const dept = data.dept
     const location = data.location

      try {
         const newJob = await addJob(title,description,dept,location);
     res.json(newJob);
   } catch (err) {
     console.error(err);
     res.status(500).json({ err: "Something went wrong in addJob" });
   }

 
  })

  app.get("/hiringportal",async (req,res) => {
   const data = req.body

    try {
     const Jobs = await getjobs();
   res.json(Jobs);
 } catch (err) {
   console.error(err);
   res.status(500).json({ err: "Something went wrong in getJobs" });
 } 
 })

  //apply for job
 app.post("/jobapplication",async (req,res) => {
     const data = req.body

      const name = data.name
     const contact = data.contact
     const email = data.email
          linkedinUrl
         location

 
  })

  // start the server in the port 5000!
 app.listen(process.env.PORT || 8000, function () {
     console.log("Example app listening on port 8000.");
   });
   //page doesnt exist
   app.use(function (req, res, next) {
     res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
     res.header("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Origin", "*");
   }); 