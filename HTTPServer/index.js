var express = require("express"), fs = require("fs"), jwt = require("jsonwebtoken"), db = require("./MongoDBHandlers"), path = require("path");
var server = express();
server.use(express.static(path.join(__dirname, "..", "dist")));
server.use(express.json());
var key = fs.readFileSync("./privateKey.txt", "utf-8");
server.post("/submit", async (req, res) => {
    const obj = req.body;
    if("FileInput" in obj) {
        try {
            await db.init();
            var users = await db.getUsers({Name : obj.Name});
            if(users.length > 0)
                res.json({err : 3});
            await db.insert([obj]);
            jwt.sign(obj, key, { expiresIn:"2days" }, (err, token) => {
                if(err) {
                    console.log("Error occured while encoding form data to json web token\n", err);
                    res.json({err : 2});
                }
                else {
                    console.log("Json token creation successfull\n");
                    res.json({token : token, err : 0});
                }
            });
        }
        catch(err) {
            console.log("ERROR: ", err);
        }
        finally {
            await db.term();
        }
    }
    else {
        try {
            await db.init(); 
            var users = await db.getUsers({Name : obj.Name});
            if(users.length == 0)
                res.json({err : 1});
            else {
                jwt.sign(users[0], key, { expiresIn:"2days" }, (err, token) => {
                    if(err) {
                        console.log("Error occured while encoding form data to json web token\n", err);
                        res.json({err : 2});
                    }
                    else {
                        console.log("Json token creation successfull\n");
                        res.json({token : token, err : 0});
                    }
                });
            }
        }
        catch(err) {
            console.log("ERR: ", err);
        }
    }
});
server.get("/authenticate", (req, res) => {
    const token = req.query.token;
    jwt.verify(token, key, (err, obj) => {
        if(err) {
            console.log("Verification error");
            res.json({err : 1});
        }
        else {
            console.log("Verification succesful");
            res.json({err : 0});
        }
    });
});
server.get("*", (req, res) => res.sendFile(path.join(__dirname, "..", "dist", "index.html")));
server.listen(3000, () => console.log("Server listening or http://localhost:3000/"));



