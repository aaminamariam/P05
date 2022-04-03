//require express and create instance
// this file contains all rest apis
var express = require("express");
var app = express();

const {
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
  addNewAnnouncement,
  addAnnouncements,
  getAnnouncements,
  addNewEmployee,
} = require("./dynamo");

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

// rest apis
//post
app.post("/employee", async (req, res) => {
  const data = req.body;
  const employee = data.employeeID;
  const name = data.name;
  try {
    const newEmployee = await addOrUpdateEmployee(employee, name);
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//post
app.post("/addnewemployee", async (req, res) => {
  const data = req.body;

  const id = data.employeeID;
  const name = data.name;
  const department = data.department;
  const designation = data.designation;
  const level = data.level;
  const dateJoined = data.dateJoined;
  const email = data.email;
  const contact = data.contact;
  const address = data.address;
  const remainingLeaves = data.remainingLeaves;
  const twRating = data.twRating;

  try {
    const newEmployee = await addNewEmployee(
      id,
      name,
      department,
      designation,
      level,
      dateJoined,
      email,
      contact,
      address,
      remainingLeaves,
      twRating
    );
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in addnewemployee" });
  }
});

//get all items
app.get("/ids", async (req, res) => {
  try {
    const characters = await getEmployees();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//delete a specific item
app.delete("/ids/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteEmployee(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//add request
app.post("/addreq", async (req, res) => {
  const data = req.body;
  const postdate = new Date().toISOString().slice(0, 10);
  console.log(data);
  try {
    const newCharacter = await addrequest(
      data.option,
      data.description,
      data.employeeID,
      postdate
    );
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// approve requests for HR
app.post("/approveRequests", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    res.json(
      await approveRequests(
        data.employeeID,
        data.approval,
        data.description,
        data.option
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// deny requests for HR
app.post("/denyRequests", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    res.json(
      await denyRequests(
        data.employeeID,
        data.approval,
        data.description,
        data.option
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//add employee statistics
//rating, comments, teamwork score
//no of projects/tasks, no of leaves->from db
app.put("/addstats", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    res.json(
      await addstats(
        data.employeeID,
        data.comments,
        data.rating,
        data.teamworkScore,
        data.hoursworked
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//get requests
app.get("/getEmployeeRequests", async (req, res) => {
  try {
    const requests = await getEmployeeRequests();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/getrequests/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // const requests = await getEmployeeReqbyID(id, );
    res.json(await getEmployeeReqbyID(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//display stats of employee
app.get("/getstats/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //const stats = await getEmployeeStatsbyID(id);
    res.json(await getEmployeeStatsbyID(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//add announcements
app.post("/addNewAnnouncement", async (req, res) => {
  const data = req.body;
  const today = new Date().toISOString().slice(0, 10);
  const id = today;
  console.log("date recieved by server: ", data);
  try {
    res.json(
      await addNewAnnouncement(
        id,
        data.postedBy,
        data.title,
        data.department,
        data.data,
        today
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "Something went wrong while adding announcements in server",
    });
  }
});

//get announcements
app.get("/getAnnouncements", async (req, res) => {
  try {
    res.json(await getAnnouncements());
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/activereq", async (req, res) => {
  try {
    // const requests = await getEmployeeReqbyID(id, );
    res.json(await getEmployeeReqbystatus());
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// start the server in the port 5000!
app.listen(process.env.PORT || 5001, function () {
  console.log("Example app listening on port 5001.");
});
//page doesnt exist
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
