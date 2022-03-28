const {
    pdf_parser
} = require("./parser")
const fs = require("fs");


let keywords = ["Performed", "experience","sleepy"]
listwords = []


const get_match = (keywords,file) => {

    const filedata = require(file); 
    // const data = JSON.parse(filedata);
    let data = filedata["data"]
    let listwords = [];
  
    const set_w = new Set()
    let regwords = []
    let score = 0.0


    for (let i of keywords){
        const e =  new RegExp(i, "gi");
        regwords.push(e)
        // console.log(e)
    }
    console.log(regwords)

    // data.forEach(x =>
      regwords.forEach(y => {
        if (data.match(y) !== null){
        listwords.push(data.match(y))
        set_w.add(data.match(y))
        }
      })
    // )

    score = (set_w.size/keywords.length) * 100;


    return {score,listwords}
}
// 1. call pdf parser with filename
// pdf_parser("res_Test.pdf")

//2. call getmatch 
console.log(get_match(keywords,"./resume.json"))


// 3.delete resume.json




