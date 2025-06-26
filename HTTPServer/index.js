//var express = require("express");
//
//var app = express();
//app.get('/', (req, res) => { 
//    res.json({"name":"Sparsha", "section":"B"})
//    process.stdout.write("Hello");
//    console.log(typeof(req.query));
//    console.log(typeof(req.params));
//    console.log(typeof(req.body));
//    console.log(typeof(req.method));
//    console.log(typeof(req.url));
//    console.log(typeof(req.cookies));
//    console.log(typeof(req.ip));
//});
//app.listen(8080, () => { console.log("Server running on http://localhost:8080/"); });
//var arr = [1,2,3,4,5], newArr = [];
//for(let i = 0; i < arr.length; i++)
//    newArr[i] = (arr[i] * 2);
//for(let i = 0; i < newArr.length; i++)
//    console.log(newArr[i]); // console.log() can print any data type and appends a newline after each printing.
//process.stdout.write('\n'); // process.stdout.write(<string>) always accepts a string. Trying to print other data
// types causes error.
//var arr = [1,2,3,4,5];
//var newArr1 = arr.filter((n) => n % 2);
//console.log(newArr1);
//var newArr2 = arr.map(n => n * 2);
//console.log(newArr2);
var express = require("express"), fs = require("fs"), jwt = require("jsonwebtoken"), db = require("./MongoDBHandlers");
var server = express();
server.use(express.json());
var key = fs.readFileSync("./privateKey.txt", "utf-8");
server.post("/submit", (req, res) => {
    const obj = req.body;
    if(obj.type === "register") {
        jwt.sign(obj, key, { expiresIn:"2days" }, (err, token) => {
            if(err) {
                console.log("Error occured while encoding form data to json web token\n" + err);
                res.status(500).json({token : "invalid"});
            }
            else {
                console.log("Json token creation successfull\n");
                res.json({token : token});
            }
        });
    }
});


