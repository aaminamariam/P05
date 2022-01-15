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
  console.log(data);
  try {
    const newCharacter = await addrequest(
      data.option,
      data.description,
      data.employeeID
    );
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// approve requests for HR
app.post("/approverequests", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const requestStatus = await approvedenyRequests(
      data.employeeID,
      data.approval
    );
    res.json(requestStatus);
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
app.get("/getrequests", async (req, res) => {
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

// app.get("/activereq/:id", async (req, res) => {
//   const { id } = req.params;
//   const rstatus = "Null";
//   console.log(rstatus);
//   try {
//     // const requests = await getEmployeeReqbyID(id, );
//     res.json(await getEmployeeReqbystatus(id, rstatus));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });

// start the server in the port 5000!
app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 5000.");
});
//page doesnt exist
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
