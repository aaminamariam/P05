const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { get_match } = require("./findwords");
const { pdf_parser } = require("./parser");
const { exctractor } = require("./data");
const decompress = require("decompress");

const {
  addJob,
  getjobs,
  deleteJob,
  jobcount,
  addJobApplication,
} = require("./AppDynamo");
const { createTokens, validateToken } = require("./jwt");
let name = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    name = file.originalname;
  },
});

const uploadStorage = multer({ storage: storage });

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
//upload cv
app.post("/parsedcv", uploadStorage.single("file"), async (req, res) => {
  path = "./uploads/" + name;
  const data = "./uploads/ExtractTextInfoFromPDF.json";
  const fn = req.body.filename;
  try {
    const folder = "./uploads/";
    const result = await exctractor(path);
  } catch (err) {
    console.log(err);
  }
  return res.send("hi");
});

app.post("/keywords", async (req, res) => {
  const data = req.body;
  const wordlist = data.keywords;
  const fname = data.fname.slice(0, -4);
  const storage = "./uploads/" + fname + ".zip";
  const ready = await decompress(storage, "./uploads/parsed").then((mat) => {
    const matches = get_match(wordlist, "./uploads/parsed/structuredData.json");
    res.send(matches);
  });
});

//post new job
app.post("/addnewposting", async (req, res) => {
  const data = req.body;
  const title = data.title;
  const description = data.description;
  const dept = data.dept;
  const location = data.location;
  const type = data.type;

  try {
    const newJob = await addJob(title, description, dept, location, type);
    res.json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in addJob" });
  }
});

app.get("/hiringportal", validateToken, async (req, res) => {
  const data = req.body;
  try {
    const Jobs = await getjobs();
    res.json(Jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in getJobs" });
  }
});
//apportal
app.get("/apportal", async (req, res) => {
  const data = req.body;
  try {
    const Jobs = await getjobs();
    res.json(Jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in getJobs" });
  }
});

//get number of jobs
app.get("/jobcount", validateToken, async (req, res) => {
  try {
    const jobcounts = await jobcount();
    res.json(jobcounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in jobcount" });
  }
});

//delete job posting
app.delete("/hiringportal/:date", validateToken, async (req, res) => {
  const { date_posted } = req.params;
  console.log(date_posted);
  try {
    res.json(await deleteJob(req.params));
  } catch (err) {
    console.error(err);

    res.status(500).json({ err: "Something went wrong" });
  }
});

//apply for job
app.post("/jobapplication", async (req, res) => {
  const data = req.body;

  const name = data.name;
  const contact = data.contact;
  const email = data.email;
  linkedinUrl;
  location;
});

app.listen(process.env.PORT || 8000, function () {
  console.log("Example app listening on port 8000.");
});
//page doesnt exist
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
