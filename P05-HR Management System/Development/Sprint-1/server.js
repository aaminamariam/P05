//require express and create instance
var express = require("express");
var app = express();
//imprts form database module
const {
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
} = require("./dynamo");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// rest apis
//post
app.post("/characters", async (req, res) => {
  const employee = req.body;
  try {
    const newEmployee = await addOrUpdateEmployee(employee);
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
// start the server in the port 5000!
app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 5000.");
});
//page doesnt exist
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', '*');
});