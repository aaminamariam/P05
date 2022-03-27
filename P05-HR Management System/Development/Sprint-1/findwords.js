const fs = require('fs');
  
// Use fs.readFile() method to read the file
let keywords = ["Performed", "experience"]
const get_match = (keywords) = {

}
let regwords =[]
for (let i of words){
    const e =  new RegExp(i, "gi");
    regwords.push(e)
    // console.log(e)
}
console.log(regwords)

fs.readFile('test.txt', 'utf8', function(err, data){
      
    // Display the file content
    data = JSON.parse(data);
    for (const x of data) { 
        // const regexpSpooky = /.it\w+/gi
        // str.replace("", '');
        //console.log(x)
        for (const y of regwords){
        console.log(x.match(y));
        
        }
    }


});
  
console.log('readFile called');



    
