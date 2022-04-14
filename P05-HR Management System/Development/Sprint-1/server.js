//require express and create instance
// this file contains all rest apis
var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {
  getEmployees,
  addOrUpdateEmployee,
  deleteEmployee,
  addrequest,
  approveRequests,
  denyRequests,
  getEmployeeRequests,
  getEmployeeReqbyID,
  getEmployeeReqbystatus,
  addstats,
  login,
  employeecount,
  getEmployeeStatsbyID,
  addNewAnnouncement,
  addAnnouncements,
  getAnnouncements,
  cvcount,
  changepassword,
  get_password,
  addNewEmployee,
} = require("./dynamo");

const { add_cv_data, getapplications } = require("./uploader");
const { createTokens, validateToken } = require("./jwt");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// rest apis
//post
app.post("/login", async (req, res) => {
  const userid = req.body.id;

  if (userid == null) {
    return res.status(400).send("Cannot find user");
  }

  let data = await login(req.body.id);

  try {
    // Load hash from your password DB.
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.Items[0].password
    );
    if (validPassword) {
      // {
      //   res.json("Success");

      // const accessToken = generateAccessToken(user);
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      // refreshTokens.push(refreshToken);
      // res.json({ accessToken: accessToken, refreshToken: refreshToken });
      const user = {
        id: userid,
        name: data.Items[0].name,
        role: data.Items[0].role,
      };
      const accessToken = createTokens(user);

      res.json(accessToken);

      // res.json("Success");
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch {
    res.status(500).send();
  }
});

//change password

app.post("/changepassword", validateToken, async (req, res) => {
  const data = req.body;
  const id = data.id;
  const newpass = data.newpassword;
  const currpass = data.password;
  // console.log(data);

  try {
    // const changepass = await changepassword(id,newpass);
    const dbpass = await get_password(id);
    const test_pas = dbpass.Items[0].password;

    const validPassword = await bcrypt.compare(currpass, test_pas);
    if (validPassword) {
      const changepass = await changepassword(id, newpass);
      res.json("Success");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//for user authentication
app.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});

//post
app.post("/employee", async (req, res) => {
  const data = req.body;
  const employee = data.id;
  const name = data.name;
  const role = data.role;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const newEmployee = await addOrUpdateEmployee(
      employee,
      name,
      hashedPassword,
      role
    );
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//employee count
app.get("/employeecount", validateToken, async (req, res) => {
  try {
    const count = await employeecount();
    res.json(count);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong  in employeecount" });
  }
});

//getcv data
app.get("/getcvs", validateToken, async (req, res) => {
  try {
    const cvs = await getapplications();
    res.json(cvs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//cv count
app.get("/cvcount", validateToken, async (req, res) => {
  try {
    const count = await cvcount();
    res.json(count);
  } catch (err) {
    res.status(500).json({ err: "Something went wrong  in cvcount" });
  }
});

//add a new employee
app.post("/addnewemployee", async (req, res) => {
  const data = req.body;

  const id = data.employeeID;
  const name = data.name;
  const department = data.department;
  const designation = data.designation;
  const level = data.level;
  const role = data.role;
  const dateJoined = new Date().toISOString().slice(0, 10);
  const email = data.email;
  const contact = data.contact;
  const address = data.address;
  const gender = data.gender;
  //const dateOfBirth = data.dateOfBirth;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const newEmployee = await addNewEmployee(
      id,
      name,
      department,
      designation,
      level,
      role,
      hashedPassword,
      dateJoined,
      email,
      contact,
      address,
      gender
      //dateOfBirth
    );
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong in addnewemployee" });
  }
});

//get all items
app.get("/ids", validateToken, async (req, res) => {
  try {
    const characters = await getEmployees();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//get all items
app.get("/getapplications", validateToken, async (req, res) => {
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
  const postdate = new Date().toISOString().slice(0, 19);
  console.log(data);
  try {
    const newCharacter = await addrequest(
      data.type,
      data.data,
      data.id,
      data.title,
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
  console.log(data, "data");
  try {
    res.json(await approveRequests(data.id));
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
    res.json(await denyRequests(data.id));
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
app.get("/getEmployeeRequests", validateToken, async (req, res) => {
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
    res.json(await getEmployeeStatsbyID(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//add announcements
app.post("/addNewAnnouncement", async (req, res) => {
  const data = req.body;
  const today = new Date().toISOString().slice(0, 19);
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

//adds cv to database
app.put("/addresume_info", async (req, res) => {
  const data = req.body;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const city = data.city;
  const sp = data.sp;
  const linkedin = data.linkedin;
  const cv = data.cv;
  const today = new Date().toISOString().slice(0, 19);
  const id = today;

  try {
    res.json(await add_cv_data(name, city, linkedin, phone, email, cv, sp));
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
