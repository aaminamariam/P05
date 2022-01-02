//require express and create instance
var express = require("express");
var app = express();
//imprts form database module
const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
} = require("./dynamo");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// rest apis
//post
app.post("/characters", async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//get all items
app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//delete a specific item
app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteCharacter(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//page doesnt exist
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 5000!
app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 5000.");
});
