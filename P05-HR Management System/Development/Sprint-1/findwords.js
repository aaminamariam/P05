const { pdf_parser } = require("./parser");
const fs = require("fs");

let keywords = ["Performed", "experience", "sleepy"];
listwords = [];

// returns the percentage of words matched with the keywords
const get_match = (keywords, file) => {
  const filedata = require(file);

  let data = filedata["data"];
  let listwords = [];

  const set_w = new Set();
  let regwords = [];
  let score = 0.0;

  //converting keywords to regex expressions
  for (let i of keywords) {
    const e = new RegExp(i, "gi");
    regwords.push(e);
    // console.log(e)
  }
  console.log(regwords);

  //checking for matches
  regwords.forEach((y) => {
    if (data.match(y) !== null) {
      listwords.push(data.match(y));
      set_w.add(data.match(y));
    }
  });

  //calculating the percentage of matches
  score = (set_w.size / keywords.length) * 100;

  return { score, listwords };
};
module.exports = {
  get_match,
};
