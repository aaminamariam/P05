var pdfreader = require("pdfreader");
const fs = require('fs');
var rows = {}; // indexed by y-position
let data = [];


function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) =>{ 
      // console.log((rows[y] || []).join(""));
      for (let i = 0; i < rows[y].length; i++) {
      // console.log((rows[y,i] || []).join(""));
    }})
}

const get_match = (keywords,Str_txt) => {
  let regwords = [];
  let matches = 0;
  let listwords = [];
  
  const set_w = new Set()
  for (let i of keywords){
    const e =  new RegExp(i, "gi");
    regwords.push(e)
    // console.log(e)
  }
  
  data = JSON.parse(Str_txt);
  
  data.forEach(x =>
    regwords.forEach(y => {
      if (x.match(y) !== null){
       listwords.push(x.match(y))
       set_w.add(x.match(y))
      }
    })
  )
  const score = (set_w.size/keywords.length) * 100
  return {score,listwords};
}


let keywords = ["Performed", "experience", "football"];

let file = "res_Test.pdf"

const pdf_parser = (keywords,file) => {
  let counts = 0.0 
  return new pdfreader.PdfReader().parseFileItems(
  file,
  (async (err, item) => {
    if (!item || item.page) {
      // end of file, or page
      printRows();
      
      // console.log("PAGE:", item.page);
      rows = {}; // clear rows for next page

    } else if (item.text) {
      // accumulate text items into rows object, per line
      (rows[item.y] = rows[item.y] || []).push(item.text);
      data.push(item.text);
    }
    // stringify data
    let Str_txt = JSON.stringify(data);
    counts = get_match(keywords,Str_txt);
    return await counts 
  }

));
}

console.log(pdf_parser(keywords,file))
// console.log("end");

// module.exports = {
//   pdf_parser
// }