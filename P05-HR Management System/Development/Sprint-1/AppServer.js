const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addJob,
  getjobs,
  deleteJob,
  jobcount,
  addJobApplication,
} = require("./AppDynamo");
const { createTokens, validateToken } = require("./jwt");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
app.post("/parsedcv", uploadStorage.single("file"), (req, res) => {
  console.log(req.body);
  return res.send("Single file");
});
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.post("/f", upload.any(), (req, res) => {
  if (req.files) {
    console.log(req.files);
    res.send("File uploaded");
  }
  console.log(req.body);
});

//post new job
app.post("/addnewposting", async (req, res) => {
  const data = req.body;

  const title = data.title;
  const description = data.description;
  const dept = data.dept;
  const location = data.location;

  try {
    const newJob = await addJob(title, description, dept, location);
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

// app.post("/parsedcv", upload.any(), async (req, res) => {
//   const data = req.files;
//   const { file } = req.body;
//   res.json("best");
//   console.log(req.files, req.body);
//   fs.writeFileSync("uploads/test.pdf", file);
// });
// app.post("/parsedcv", upload.any(), handleUpload);
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
